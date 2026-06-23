export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 30px 80px rgba(16, 185, 129, 0.15)',
        'blue-glow': '0 20px 50px rgba(37, 99, 235, 0.15)',
      },
      colors: {
        surface: '#0b1120',
      },
    },
  },
  plugins: [],
}
