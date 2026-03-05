/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: '#2E7D32',
            light: '#4CAF50',
            dark: '#1B5E20'
          },
          light: '#F9FAF8',
          dark: '#1F2937'
        }
      }
    },
  },
  plugins: [],
}
