/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'], // changed from 'content' to 'purge'
  theme: {
    extend: {
      colors: {
        backgroundGray: '#f4f6f9',
        blu: '#0070BA',
        blu_med: '#004B7c',
        blu_dark: '#00253E'
      }
    },
    plugins: [require('@tailwindcss/forms')]
  }
}
