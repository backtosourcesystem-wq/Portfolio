/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto', 'ui-sans-serif', 'system-ui'],
        'heading': ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: '#F36D40',
          50: '#FEF2F0',
          100: '#FDE5E1',
          200: '#FBCBC3',
          300: '#F9B1A5',
          400: '#F79787',
          500: '#F36D40',
          600: '#EC4A1A',
          700: '#C23B15',
          800: '#982D10',
          900: '#6E200B'
        },
        text: {
          DEFAULT: '#2C3E50',
          light: '#7F8C8D'
        },
        neutral: {
          DEFAULT: '#BDC3C7',
          light: '#ECF0F1',
          dark: '#95A5A6'
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
};