/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Dark blue
        secondary: '#DBEAFE', // Light blue
        accent: '#2563EB', // Medium blue
        polyGreen: '#166534', // Kwara Poly green
      },
    },
  },
  plugins: [],
}

