/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fluent: {
          bg: '#202020', // Mica background
          surface: 'rgba(255, 255, 255, 0.05)',
          surfaceHover: 'rgba(255, 255, 255, 0.08)',
          surfaceActive: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.08)',
          text: '#ffffff',
          textSecondary: 'rgba(255, 255, 255, 0.7)',
          accent: {
            DEFAULT: '#0078D4',
            light: '#60CDFF',
            dark: '#005FB8',
          },
          acrylic: 'rgba(32, 32, 32, 0.7)',
        },
      },
      fontFamily: {
        sans: ['"Segoe UI Variable"', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'fluent-btn': '4px',
        'fluent-card': '0.75rem', // 12px
      },
      backdropBlur: {
        fluent: '20px',
      },
      boxShadow: {
        fluent: '0 4px 8px 0 rgba(0,0,0,0.2), 0 1px 2px 0 rgba(0,0,0,0.1)',
        'fluent-elevated': '0 8px 16px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}
