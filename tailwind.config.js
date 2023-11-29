/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#55423D',
        secondary: '#140D0B',
        background: '#FFF3EC',
      }
    },
    fontFamily: {
      'display': ['Lora'],
      'body': ['Montserrat'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
