/***************************************************
 * Tailwind Config - Helados Gourmet SPA
 ***************************************************/
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    'bg-vanilla',
    'bg-strawberry',
    'bg-pistachio',
    'bg-chocolate',
    'bg-matcha'
  ],
  theme: {
    extend: {
      colors: {
        vanilla: '#F5E6C8',
        strawberry: '#FAD1D8',
        pistachio: '#CDE3C1',
        chocolate: '#5A3E36',
        matcha: '#A3C686',
        accent: '#FF6B6B'
      },
      fontFamily: {
        display: ['\"Fraunces\"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'xl': '1rem',
      },
      boxShadow: {
        'soft': '0 4px 24px -4px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
};
