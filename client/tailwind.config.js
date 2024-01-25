export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",
        "primary-content": "#ffffff",
        "primary-dark": "#5f14e0",
        "primary-light": "#9b69f1",

        secondary: "#ed7c3a",
        "secondary-content": "#251003",
        "secondary-dark": "#e05f14",
        "secondary-light": "#f19b69",

        background: "#19181b",
        foreground: "#252329",
        border: "#3e3b45",

        copy: "#fbfbfb",
        "copy-light": "#d8d6dc",
        "copy-lighter": "#a49fac",

        success: "#3aed3a",
        warning: "#eded3a",
        error: "#ed3a3a",
        "success-content": "#032503",
        "warning-content": "#252503",
        "error-content": "#ffffff",
      },
      textShadow: {
        "primary-dark": "1px 1px var(--primary-dark)",
      },
    },
    fontFamily: {
      Rubik: ["Rubik", "sans-serif"],
      Righteous: ["Righteous", "sans-serif"],
    },
    screens: {
      sm: "360px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
