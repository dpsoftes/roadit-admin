/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "../shared/src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        roadit: {
          primary: '#2D3D32',
          accent: '#C7D944',
          'text-dark': 'rgba(255, 255, 255, 0.87)'
        }
      },
      fontFamily: {
        'geist': ['Geist', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Evita conflictos con Angular Material
  }
}