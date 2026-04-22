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
          detection: '#14b8a6',
          surveillance: '#ec4899',
          prediction: '#f97316',
          forensic: '#22c55e',
          backend: '#8b5cf6',
          frontend: '#92400e',
          other: '#6b7280'
        }
      }
    },
  },
  plugins: [],
}
