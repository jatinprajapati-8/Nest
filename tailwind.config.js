/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage :{
      "section-bg": "url('/src/assets/Shapes.png')"
    },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}