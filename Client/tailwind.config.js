/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "royal-amethyst": "#3335FB",
        "icy-lilac": "#f2f1ff",
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
