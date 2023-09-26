/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'], // changed from 'content' to 'purge'
  theme: {
    extend: {
      colors: {
        backgroundGray: '#f4f6f9'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
