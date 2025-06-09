/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      youtube: ['"YouTube Sans"', "Roboto", "Arial", "sans-serif"],
    },
    colors: {
      "yt-black": "#0F0F0F",
      "yt-red": "#FF0300",
      "yt-green": "green",
      "yt-white": "#F1F1F1",
      "yt-light-black": "#272727",
      "yt-light": "#181818",
      "yt-light-1": "#212121",
      "yt-gray": "gray",
      "yt-blue": "#3ea6ff",
      "yt-light-blue": "#263850",
      "yt-border": "rgba(255,255,255,0.2)",
    },
    extend: {
      screens: {
        "max-450": { max: "450px" },
        "max-791": { max: "791px" },
        "max-1054": { max: "1054px" },
      },
      gridTemplateColumns: {
        yt: "repeat(auto-fit,minmax(300px,1fr))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};