/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0b0d11',
        midnight: '#10141b',
        slate: '#151922',
        gold: {
          DEFAULT: '#c5a059',
          light: '#f3d38c',
          dark: '#8f6c2c',
        },
        parchment: '#f4f1ea',
        alabaster: '#e2dfd7',
        frame: '#262d3d',
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at top, rgba(197,160,89,0.08), transparent 60%)',
      },
      boxShadow: {
        gilded: '0 0 0 1px rgba(197,160,89,0.35), 0 20px 60px -20px rgba(0,0,0,0.8)',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
