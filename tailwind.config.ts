/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js", // Tell Tailwind to scan your JS file for classes
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'), // A plugin for nicer form styles
  ],
}