/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#191919",
        backdrop: 'rgba(30, 30, 30, 0.68)'
      },
      backgroundImage: {
        'green-grad': "url('/assets/green-grad.png')",
        'neon-grad': "linear-gradient(90deg, #00D502 8.19%, #00864E 49.3%, #004745 94.64%)"
      }
    },
  },
  plugins: [],
}