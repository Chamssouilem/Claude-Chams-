import type { Config } from 'tailwindcss';

/**
 * Tailwind greift auf dieselben CSS-Variablen zu wie app/globals.css.
 *
 * Die Farben stehen als KANALWERTE in den Variablen ("20 16 14" statt
 * "#14100e"). Nur so funktionieren Tailwinds Deckkraft-Angaben wie bg-ink/95:
 * Sie setzen den Wert in rgb(... / .95) ein, und ein Hex-Wert wäre dort
 * ungültiges CSS — der Browser verwirft die Regel stillschweigend.
 * Farben werden hier NICHT noch einmal als Hex-Werte hinterlegt — es gibt
 * genau eine Quelle, und die steht im :root-Block der globals.css.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    // Bruchpunkte laut Briefing: 640 / 900 / 1200
    screens: {
      sm: '640px',
      md: '900px',
      lg: '1200px',
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--pb-ink-rgb) / <alpha-value>)',
          2: 'rgb(var(--pb-ink-2-rgb) / <alpha-value>)',
          3: 'rgb(var(--pb-ink-3-rgb) / <alpha-value>)',
          4: 'rgb(var(--pb-ink-4-rgb) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'rgb(var(--pb-line-rgb) / <alpha-value>)',
          strong: 'rgb(var(--pb-line-strong-rgb) / <alpha-value>)',
        },
        cream: {
          DEFAULT: 'rgb(var(--pb-cream-rgb) / <alpha-value>)',
          dim: 'rgb(var(--pb-cream-dim-rgb) / <alpha-value>)',
        },
        muted: 'rgb(var(--pb-muted-rgb) / <alpha-value>)',
        ember: {
          DEFAULT: 'rgb(var(--pb-ember-rgb) / <alpha-value>)',
          hover: 'rgb(var(--pb-ember-hover-rgb) / <alpha-value>)',
          bright: 'rgb(var(--pb-ember-bright-rgb) / <alpha-value>)',
          text: 'rgb(var(--pb-ember-text-rgb) / <alpha-value>)',
        },
        berry: {
          DEFAULT: 'rgb(var(--pb-berry-rgb) / <alpha-value>)',
          text: 'rgb(var(--pb-berry-text-rgb) / <alpha-value>)',
        },
        brass: {
          DEFAULT: 'rgb(var(--pb-brass-rgb) / <alpha-value>)',
          deep: 'rgb(var(--pb-brass-deep-rgb) / <alpha-value>)',
        },
        paper: 'rgb(var(--pb-paper-rgb) / <alpha-value>)',
        signal: {
          open: 'rgb(var(--pb-open-rgb) / <alpha-value>)',
          closed: 'rgb(var(--pb-closed-rgb) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      fontSize: {
        micro: 'var(--fs-micro)',
        small: 'var(--fs-small)',
        body: 'var(--fs-body)',
        lead: 'var(--fs-lead)',
        h4: 'var(--fs-h4)',
        h3: 'var(--fs-h3)',
        h2: 'var(--fs-h2)',
        display: 'var(--fs-display)',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--space-section)',
        block: 'var(--space-block)',
        header: 'var(--header-h)',
      },
      maxWidth: {
        shell: 'var(--max-w)',
        measure: 'var(--measure)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'var(--radius-sm)',
      },
      transitionTimingFunction: {
        pb: 'var(--ease)',
      },
      zIndex: {
        header: '40',
        bottombar: '45',
        dialog: '60',
        consent: '70',
        skip: '100',
      },
    },
  },
  plugins: [],
};

export default config;
