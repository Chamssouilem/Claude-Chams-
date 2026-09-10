'use client';

/**
 * Warenkorb. Liegt ausschließlich im Browser (localStorage) — es geht nichts
 * an einen Server, weil es keinen gibt. Das ist technisch notwendige
 * Speicherung im Sinne von § 25 Abs. 2 Nr. 2 TDDDG und damit einwilligungsfrei;
 * beschrieben ist es trotzdem in der Datenschutzerklärung.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine } from './types';
import { cartCount, cartTotal, configKey } from './pricing';

const STORAGE_KEY = 'pb-cart-v1';

type Action =
  | { type: 'add'; line: Omit<CartLine, 'lineId'> }
  | { type: 'remove'; lineId: string }
  | { type: 'setQty'; lineId: string; qty: number }
  | { type: 'clear' }
  | { type: 'restore'; lines: CartLine[] };

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'add': {
      const key = configKey(action.line);
      const existing = state.find((l) => configKey(l) === key);
      if (existing) {
        return state.map((l) =>
          l.lineId === existing.lineId ? { ...l, qty: Math.min(l.qty + action.line.qty, 99) } : l,
        );
      }
      return [...state, { ...action.line, lineId: `${key}#${Date.now().toString(36)}` }];
    }
    case 'remove':
      return state.filter((l) => l.lineId !== action.lineId);
    case 'setQty':
      if (action.qty <= 0) return state.filter((l) => l.lineId !== action.lineId);
      return state.map((l) =>
        l.lineId === action.lineId ? { ...l, qty: Math.min(action.qty, 99) } : l,
      );
    case 'clear':
      return [];
    case 'restore':
      return action.lines;
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  /** false, bis der gespeicherte Warenkorb gelesen wurde — verhindert Hydration-Fehler. */
  ready: boolean;
  restored: boolean;
  dismissRestored: () => void;
  add: (line: Omit<CartLine, 'lineId'>) => void;
  remove: (lineId: string) => void;
  setQty: (lineId: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) return false;
  const l = value as Record<string, unknown>;
  return (
    typeof l.lineId === 'string' &&
    typeof l.itemId === 'string' &&
    typeof l.name === 'string' &&
    typeof l.qty === 'number' &&
    typeof l.unitBase === 'number' &&
    Array.isArray(l.addonIds) &&
    Array.isArray(l.sauceIds)
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [ready, setReady] = useState(false);
  const [restored, setRestored] = useState(false);

  // Einmal beim Start aus dem Speicher lesen.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(isCartLine);
          if (valid.length > 0) {
            dispatch({ type: 'restore', lines: valid });
            setRestored(true);
          }
        }
      }
    } catch {
      // Privater Modus oder blockierter Speicher — die Seite funktioniert
      // trotzdem, der Warenkorb überlebt dann nur kein Neuladen.
    }
    setReady(true);
  }, []);

  // Nach jeder Änderung zurückschreiben.
  useEffect(() => {
    if (!ready) return;
    try {
      if (lines.length === 0) window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* siehe oben */
    }
  }, [lines, ready]);

  const add = useCallback((line: Omit<CartLine, 'lineId'>) => dispatch({ type: 'add', line }), []);
  const remove = useCallback((lineId: string) => dispatch({ type: 'remove', lineId }), []);
  const setQty = useCallback(
    (lineId: string, qty: number) => dispatch({ type: 'setQty', lineId, qty }),
    [],
  );
  const clear = useCallback(() => dispatch({ type: 'clear' }), []);
  const dismissRestored = useCallback(() => setRestored(false), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: cartCount(lines),
      total: cartTotal(lines),
      ready,
      restored,
      dismissRestored,
      add,
      remove,
      setQty,
      clear,
    }),
    [lines, ready, restored, dismissRestored, add, remove, setQty, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart muss innerhalb von <CartProvider> verwendet werden.');
  return ctx;
}
