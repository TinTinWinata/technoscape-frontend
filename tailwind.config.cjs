/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F4AF23',
        darkPrimary: '#F4B923',
        background: '#FFFEFA',
        secondaryFont: '#9D9D9D',
        font: '#56371',
        border: '#655B5B',
      },
    },
  },
  plugins: [],
};
