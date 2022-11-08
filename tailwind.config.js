/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  // important: "#root",
  theme: {
    extend: {
      colors: {
        button: "#2EBAC1",
        "l-blue": "#00A7B4",
        "r-blue": "#A4D96C",
      },
      backgroundColor: {
        primary: "#E7ECF3",
        secondary: "#00B4AA",
      },
    },
    screens: {
      md: "640px",
      // => @media (min-width: 640px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
