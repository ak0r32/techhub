import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#081322',
          900: '#0b172a',
          800: '#10233d',
        },
        brand: {
          50: '#eefcff',
          100: '#d8f5ff',
          500: '#42c7f5',
          600: '#1da7d8',
          700: '#0d86b5',
        },
        accent: {
          500: '#39d0b5',
          600: '#26b89f',
        },
      },
      boxShadow: {
        soft: '0 12px 30px rgba(13, 31, 55, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
