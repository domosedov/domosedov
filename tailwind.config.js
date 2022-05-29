/** @type {import('tailwindcss/tailwind-config').TailwindTheme} */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        serif: ['PT Sans', ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

module.exports = config
