/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './views/**/*.handlebars',
    './public/**/*.js',
    './controllers/**/*.js',
    './utils/helpers/*.js',
    './server.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}