/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      base_gray: "#dde1e6",
      pink: "#ff7eb6",

      dark: "#161616",
      light: "#1f1f1f",
      lighter: "#303030",
      "lighter-100": "rgb(55, 55, 55)",
      "lighter-200": "rgb(78, 78, 78)",
      red: colors.red,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      orange: colors.orange,
      purple: colors.purple,
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
