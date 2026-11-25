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
          DEFAULT: '#0B1E36', // Deep Navy
          light: '#162F52',
          dark: '#06111F',
        },
        accent: {
          DEFAULT: '#10B981', // Fresh Green
          hover: '#059669',
        },
        background: '#F8FAFC', // Off-white
        textDark: '#1E293B',   // Dark charcoal
        textMuted: '#64748B',  // Neutral grey
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
