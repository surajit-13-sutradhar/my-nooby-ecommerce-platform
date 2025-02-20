/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
        colors: {
            darkBlue: {
                100: "#1a1b25",
                200: "#13141d",
                300: "#0d0e16",
                500: "#06070e",
                700: "#03040a",
            }, // Custom color variable
            brightBlue: {
                100: "#4a90e2",
                200: "#357acb",
                300: "#2164b4",
                500: "#0b4e9b",
                700: "#06377c",
            },
            white: {
                100: "#ffffff",
                200: "#f3f4f6",
                300: "#e5e7eb",
                500: "#d1d5db",
                700: "#b0b3b8",
            },
        },
        fontFamily:{
            display: ['RealHeadWebW03-Book', 'sans-serif'],
        }
    },
  },
  plugins: [],
}

