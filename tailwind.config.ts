import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'black-75': 'rgba(0, 0, 0, 0.75)',
        'black-80': 'rgba(0, 0, 0, 0.8)',
      }
    },
  },
  plugins: [],
} satisfies Config

