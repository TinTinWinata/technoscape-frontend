/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#FFC144",
                darkPrimary: "#F4B923",
                background: "#FFFEFA",
                secondaryFont: "#9D9D9D",
                font: "#505050",
                border: "#655B5B",
            },
        },
    },
    plugins: [],
};
