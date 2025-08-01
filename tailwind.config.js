import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        coffee: '#4B2E2E',
        cream: '#F5F0E1',
        accent: '#C69C6D',
      },
    },
  },
  plugins: [],
}
export default config
