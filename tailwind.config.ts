import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1C1C1E',
        slate: '#2E2E33',
        steel: '#4A4A52',
        mist: '#F4F3EF',
        linen: '#FDFCF8',
        copper: {
          DEFAULT: '#B87333',
          light: '#D4924A',
          dark: '#8C5A26',
        },
        divider: '#E4E2DC',
        brand: {
          red: '#c0392b',
          black: '#111111',
          gold: '#c9a84c',
          gray: '#f5f5f5',
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'DM Sans', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config