/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-trip-sans)'],
        mono: ['var(--font-trip-sans-mono)'],
      },
      opacity: {
        disabled: 0.38,
      },
    },
  },
  daisyui: {
    themes: ['bumblebee'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
