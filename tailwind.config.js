/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx,tsx}',
    './components/**/*.{js,jsx,tsx}',
    './app/**/*.{js,jsx,tsx}',
    './src/**/*.{js,jsx,tsx}',
	],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        mo: {
          100: '#ddf4ff',
          200: '#84d8ff',
          300: '#1899d6',
        },
        'mo-success': '#58cc02'
      },
    },
  },
  plugins: [require("daisyui")],
}