/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cidit': {
          'green': '#b1f750',
          'teal': '#02c577',
          'cyan': '#1daaba',
          'dark': '#23232f',
        }
      }
    },
  },
  plugins: [],
} 