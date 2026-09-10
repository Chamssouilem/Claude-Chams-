import type { Config } from 'tailwindcss';

/**
 * Tailwind greift auf dieselben CSS-Variablen zu wie app/globals.css.
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
          DEFAULT: 'var(--pb-ink)',
          2: 'var(--pb-ink-2)',
          3: 'var(--pb-ink-3)',
          4: 'var(--pb-ink-4)',
        },
        line: {
          DEFAULT: 'var(--pb-line)',
          strong: 'var(--pb-line-strong)',
        },
        cream: {
          DEFAULT: 'var(--pb-cream)',
          dim: 'var(--pb-cream-dim)',
        },
        muted: 'var(--pb-muted)',
        ember: {
          DEFAULT: 'var(--pb-ember)',
          hover: 'var(--pb-ember-hover)',
          bright: 'var(--pb-ember-bright)',
          text: 'var(--pb-ember-text)',
        },
        berry: {
          DEFAULT: 'var(--pb-berry)',
          text: 'var(--pb-berry-text)',
        },
        signal: {
          open: 'var(--pb-open)',
          closed: 'var(--pb-closed)',
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
