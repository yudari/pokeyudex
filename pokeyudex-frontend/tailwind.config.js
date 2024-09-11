/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray': {
          800: '#1F2937',
          900: '#111827',
        },
        'blue': {
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
        },
        'purple': {
          500: '#8B5CF6',
        },
      },
    },
  },
  plugins: [],
}

