module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
      },
      colors: {
        gray: {
          50: "#F6F7F8",
          100: "#EEEFF2",
          200: "#DADDE2",
          300: "#C0C4CE",
          400: "#A7ACB9",
          500: "#7C8498",
          600: "#5E6678",
          700: "#474D5C",
          800: "#343A46",
          900: "#21252E",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
