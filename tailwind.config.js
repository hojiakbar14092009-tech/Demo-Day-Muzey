/** @type {import('tailwindcss').Config} */

// Every color below reads its value from a CSS variable (see src/index.css),
// so a single class name like `bg-obsidian` or `text-gold-light` renders the
// dark-theme color by default and the light-theme color once `.light` is on
// <html> — no component file needs a `dark:`/`light:` variant anywhere.
const themable = (name) => ({
  DEFAULT: `rgb(var(--color-${name}) / <alpha-value>)`,
})

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: themable('obsidian').DEFAULT,
        midnight: themable('midnight').DEFAULT,
        slate: themable('slate').DEFAULT,
        gold: {
          DEFAULT: 'rgb(var(--color-gold) / <alpha-value>)',
          light: 'rgb(var(--color-gold-light) / <alpha-value>)',
          dark: 'rgb(var(--color-gold-dark) / <alpha-value>)',
        },
        parchment: themable('parchment').DEFAULT,
        alabaster: themable('alabaster').DEFAULT,
        frame: themable('frame').DEFAULT,
        // Fixed near-black, used only for text sitting on a solid gold
        // fill (buttons, active pills) — it must stay dark in both themes.
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
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