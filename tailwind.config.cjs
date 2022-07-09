/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],

  daisyui: {
    styled: true,
    themes: ['lofi', 'black'],
    base: true,
    utils: true,
    logs: true,
    darkTheme: 'black'
  },
  darkMode: 'media',
}
