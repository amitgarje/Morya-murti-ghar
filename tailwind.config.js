/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B2C83',
          light: '#7E4BAA',
          dark: '#3E1B5C',
        },
        secondary: {
          DEFAULT: '#D4AF37',
          light: '#EBD076',
        },
        background: '#FCFCFC',
        text: '#1F2937',
        success: '#22C55E',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        marathi: ['Noto Sans Devanagari', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
