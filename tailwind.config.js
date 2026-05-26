/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        navy: {
          50: '#f0f6fc',
          100: '#dbeafe',
          200: '#bfdbfe',
          DEFAULT: '#0F4C81',
          600: '#0d4374',
          700: '#0a3357',
          dark: '#0a3357',
          tint: '#e8f0f9',
        },
        ink: '#0f172a',
        body: '#334155',
        muted: '#64748b',
        line: '#e2e8f0',
        gold: '#FBBF24',
        emerald: '#10b981',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(15, 23, 42, .06)',
        lift: '0 12px 40px rgba(15, 76, 129, .12)',
        ring: '0 0 0 4px rgba(15, 76, 129, .08)',
      },
      animation: {
        'fade-up': 'fadeUp .7s ease-out forwards',
        'fade-in': 'fadeIn .5s ease-out forwards',
        'slow-pulse': 'slowPulse 3s ease-in-out infinite',
        'marquee': 'marquee 38s linear infinite',
        'marquee-rev': 'marqueeRev 38s linear infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slowPulse: { '0%, 100%': { opacity: .6 }, '50%': { opacity: 1 } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        marqueeRev: { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
};
