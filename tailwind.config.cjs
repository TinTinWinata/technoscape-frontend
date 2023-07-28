/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#376FFF',
        darkPrimary: '#245ae3',
        background: '#F2F6FF',
        secondaryFont: '#9D9D9D',
        font: '#193556',
        border: '#655B5B',
      },
    },
  },
  plugins: [],
};
