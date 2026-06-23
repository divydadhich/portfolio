export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 30px 80px rgba(139, 92, 246, 0.15)',
        'violet-glow': '0 30px 80px rgba(139, 92, 246, 0.2)',
        'rose-glow': '0 30px 80px rgba(244, 63, 94, 0.15)',
        'blue-glow': '0 20px 50px rgba(6, 182, 212, 0.15)',
      },
      colors: {
        surface: '#0b1120',
      },
    },
  },
  plugins: [],
}
