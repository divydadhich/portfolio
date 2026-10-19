/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cyber: {
          dark: '#030712',
          card: '#0b1220',
          elevated: '#111c30',
          border: '#1e293b',
          cyan: '#06b6d4',
          emerald: '#10b981',
          violet: '#8b5cf6',
          amber: '#f59e0b',
        },
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        neon: '0 0 20px rgba(6, 182, 212, 0.4)',
        'neon-violet': '0 0 20px rgba(139, 92, 246, 0.4)',
        'neon-emerald': '0 0 20px rgba(16, 185, 129, 0.4)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
};
