/** @type {import('tailwindcss').Config} */

// Every color below reads its value from a CSS variable (see src/index.css),
// so a single class name like `bg-obsidian` or `text-gold-light` renders the
// light (ivory) heritage color by default and the dark (forest) one once
// `.dark` is on <html> — no component needs a `dark:`/`light:` variant.
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
        // Text sitting on a solid bronze/gold fill (buttons, active pills).
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Cinzel"', 'serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        gilded: '0 0 0 1px rgb(var(--color-gold) / 0.35), var(--shadow-soft)',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}