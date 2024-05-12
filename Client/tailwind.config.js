/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "40rem",
        md: "48rem",
        lg: "64rem",
        xl: "80rem",
        "2xl": "96rem",
      },
      colors: {
        "royal-amethyst": "#3335FB",
        "icy-lilac": "#f2f1ff",
        tanzanite: "#5D5EEF",
        white: "#FFF",
        black: "#161515",
      },

      fontFamily: {
        B612: "B612",
        Inter: "Inter",
      },
    },
  },
  plugins: [],
};
