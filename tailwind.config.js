/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      "my-color": "#1fb6ff",
      primary: "#ffffff",
      bgColor: "#260312",
      bgShade: "#C2AAE6",
      gray: "#2322232e",
      bgColor2: "#17030bbf",
      heading: "#000000",
      btnColor: "#6015d1",
      btnColorHover: "#7637d6",
      green: '#b1eef4',
      secondary: "#E2CDF4",
      "secondary-dark": "#a875d4",
      tertiary1: "#09001C",
      tertiary2: "#16002B",
      white: "#F5F5F5",
      "white-1": "#ffffff",
      black1: "#0A0213",
      black2: "#0E041A",
      black3: "#130621",
      black4: "#180829",
      black5: "#1D0B30",
      transparant: "#f0f8ff00",
      "header-gradient1": "#3c096c69",
      "header-gradient2": "#e2cdf42e",
      "font-color": "#130621",
      "bg-color": "#260312",
      "danger": '#ff0000',
      "danger-light": '#f2a6a6'
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
