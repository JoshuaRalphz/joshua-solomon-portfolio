/** @type {import('tailwindcss').Config} */
// "Sage paper, pine ink, one lime signal." Light theme only.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bricolage Grotesque"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Surfaces
        mist: '#EEF2EC',
        card: '#FBFCF9',
        sunk: '#E2EAE0',
        ink: '#0D2B23',
        'ink-2': '#17392F',
        // Text
        body: '#2F4A41',
        muted: '#4D685E',
        action: '#0A6649',
        'mist-dim': '#A9C4B7',
        danger: '#A8261D',
        // The one accent: fill only on light surfaces
        lime: { DEFAULT: '#C9F26C', deep: '#B2E147' },
        // Lines
        line: '#CDD9CE',
        'line-strong': '#74907F',
      },
      boxShadow: {
        tile: '0 1px 0 rgba(13,43,35,.05), 0 10px 28px -14px rgba(13,43,35,.22)',
        lift: '0 2px 0 rgba(13,43,35,.06), 0 22px 44px -18px rgba(13,43,35,.32)',
        well: 'inset 0 1px 2px rgba(13,43,35,.08)',
      },
      borderRadius: {
        tile: 'clamp(1.125rem, .9rem + .8vw, 1.75rem)',
        inner: '.75rem',
      },
    },
  },
  plugins: [],
};
