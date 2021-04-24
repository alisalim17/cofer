/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
module.exports = {
  darkMode: "class",
  purge: ["./src/**/*.tsx", "./public/index.html"],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: ["Menlo", "Monaco", "Courier New", "monospace"],
    },
    fontSize: {
      tiny: "0.625rem",
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
      "7xl": "5rem",
    },
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    width: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      375: "375px",
      "1/6": "16%",
    }),
    colors: {
      button: "var(--color-button-text)",
      transparent: "transparent",
      primary: {
        100: "var(--color-primary-100)",
        200: "var(--color-primary-200)",
        300: "var(--color-primary-300)",
        600: "var(--color-primary-600)",
        700: "var(--color-primary-700)",
        800: "var(--color-primary-800)",
        850: "var(--color-primary-850)",
        900: "var(--color-primary-900)",
      },
      secondary: {
        DEFAULT: "var(--color-secondary)",
        "washed-out": "var(--color-secondary-washed-out)",
      },
      accent: {
        DEFAULT: "var(--color-accent)",
        hover: "var(--color-accent-hover)",
        disabled: "var(--color-accent-disabled)",
      },
      green: {
        DEFAULT: "var(--color-green)",
      },
    },
    spacing: {
      0: "0px",
      0.5: "3px",
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "30px",
      6: "40px",
      7: "60px",
      8: "75px",
      9: "80px",
      "5l": "10rem",
      "n1/2": "-50%",
      24: "24rem",
      400: "400px",
    },
    borderWidth: {
      none: "0px",
      default: "1px",
    },
    translate: (theme, { negative }) => ({
      ...theme("spacing"),
      ...negative(theme("spacing")),
      "-full": "-100%",
      "-1/2": "-50%",
      "1/2": "50%",
      "11/12": "91%",
      full: "100%",
    }),
    extend: {
      borderRadius: {
        5: "5px",
        8: "8px",
      },
      outline: {
        "no-chrome": "none",
      },
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["disabled"]),
    textColor: ({ after }) => after(["disabled"]),
    scrollbar: ["rounded", "dark"],
  },
  plugins: [require("tailwind-scrollbar")],
};
