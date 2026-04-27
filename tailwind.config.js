/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60CDFF',
          500: '#0078D4',
          600: '#005FB8',
          700: '#004A8F',
          800: '#003366',
          900: '#001A33',
        },
        fluent: {
          bg: '#202020',
          surface: 'rgba(255, 255, 255, 0.05)',
          surfaceHover: 'rgba(255, 255, 255, 0.08)',
          surfaceActive: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.08)',
          text: '#ffffff',
          textSecondary: 'rgba(255, 255, 255, 0.7)',
          acrylic: 'rgba(32, 32, 32, 0.7)',
        },
        forensic: {
          dark: '#202020',
          medium: 'rgba(255, 255, 255, 0.03)',
          light: 'rgba(255, 255, 255, 0.08)',
        }
      },
      backdropBlur: {
        fluent: '20px',
      },
      boxShadow: {
        fluent: '0 4px 8px 0 rgba(0,0,0,0.2), 0 1px 2px 0 rgba(0,0,0,0.1)',
        'fluent-elevated': '0 8px 16px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.1)',
      },
      transitionProperty: {
        'fluent': 'all',
      },
      transitionTimingFunction: {
        'fluent': 'cubic-bezier(0.1, 0.9, 0.2, 1)',
      },
      transitionDuration: {
        'fluent': '167ms',
      }
    },
  },
  plugins: [],
}
