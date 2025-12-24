/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        evzone: {
          green: "#03cd8c",
          orange: "#f77f00",
          grey: "#6b7280",
        },
      },
      backgroundImage: {
        "ev-brand": "linear-gradient(120deg, #03cd8c 0%, #0fb981 38%, #f77f00 100%)",
        "ev-brand-soft": "linear-gradient(145deg, rgba(3,205,140,0.14), rgba(247,127,0,0.12))",
      },
      boxShadow: {
        "ev-elev": "0 10px 30px rgba(2,6,23,0.12)",
      },
    },
  },
  plugins: [],
};
