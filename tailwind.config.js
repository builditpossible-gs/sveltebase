/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#eef3ff',
          100: '#e0e9ff',
          200: '#c7d6fe',
          300: '#a5bbfc',
          400: '#8195f8',
          500: '#6371f1',
          600: '#4649e5',
          700: '#3838ca',
          800: '#3032a3',
          900: '#2e3181',
          950: '#1b1c4b',
        }
      }
    }
  },
  plugins: [require('flowbite/plugin')],
  darkMode: 'class',
}

