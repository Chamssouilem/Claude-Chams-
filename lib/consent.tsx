'use client';

/**
 * Einwilligungsverwaltung (DSGVO / TDDDG).
 *
 * Grundsatz: Vor einer aktiven Entscheidung wird NICHTS geladen, was nicht
 * technisch notwendig ist. Es gibt keine vorangekreuzten Kästchen, und
 * „Ablehnen“ ist genauso schnell erreichbar wie „Annehmen“ — beide liegen
 * gleichrangig nebeneinander im Banner.
 *
 * Gespeichert wird die Entscheidung selbst (notwendig, um sie zu respektieren),
 * mit Zeitstempel und Version — so lässt sich später nachweisen, worauf sich
 * jemand eingelassen hat.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

const STORAGE_KEY = 'pb-consent-v1';
/** Hochzählen, wenn sich die Kategorien ändern — dann wird neu gefragt. */
export const CONSENT_VERSION = 1;

export interface ConsentState {
  maps: boolean;
  statistics: boolean;
  marketing: boolean;
}

export const DENY_ALL: ConsentState = { maps: false, statistics: false, marketing: false };
export const ALLOW_ALL: ConsentState = { maps: true, statistics: true, marketing: true };

interface StoredConsent extends ConsentState {
  version: number;
  decidedAt: string;
}

interface ConsentContextValue {
  consent: ConsentState;
  /** true, sobald eine Entscheidung vorliegt (egal welche). */
  decided: boolean;
  /** false, solange der Speicher noch nicht gelesen wurde. */
  ready: boolean;
  bannerOpen: boolean;
  settingsOpen: boolean;
  decidedAt: string | null;
  save: (next: ConsentState) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  openSettings: () => void;
  closeSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(DENY_ALL);
  const [decided, setDecided] = useState(false);
  const [decidedAt, setDecidedAt] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoredConsent>;
        if (parsed.version === CONSENT_VERSION) {
          setConsent({
            maps: parsed.maps === true,
            statistics: parsed.statistics === true,
            marketing: parsed.marketing === true,
          });
          setDecided(true);
          setDecidedAt(typeof parsed.decidedAt === 'string' ? parsed.decidedAt : null);
        }
      }
    } catch {
      // Ohne lesbaren Speicher gilt: nichts erlaubt, Banner erscheint erneut.
    }
    setReady(true);
  }, []);

  const save = useCallback((next: ConsentState) => {
    const record: StoredConsent = {
      ...next,
      version: CONSENT_VERSION,
      decidedAt: new Date().toISOString(),
    };
    setConsent(next);
    setDecided(true);
    setDecidedAt(record.decidedAt);
    setSettingsOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* Entscheidung gilt dann nur für diesen Besuch. */
    }
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      decided,
      ready,
      decidedAt,
      settingsOpen,
      bannerOpen: ready && (!decided || settingsOpen),
      save,
      acceptAll: () => save(ALLOW_ALL),
      rejectAll: () => save(DENY_ALL),
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [consent, decided, ready, decidedAt, settingsOpen, save],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent muss innerhalb von <ConsentProvider> verwendet werden.');
  return ctx;
}
