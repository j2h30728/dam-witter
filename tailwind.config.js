/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        active: '#9A3412',
        base: '#F5F4F5',
        base1: '#E7E5E4',
        base2: '#A1A1AA',
        base3: '#71717A',
        base100: '#FAF7F5',
        base200: '#EFEAE6',
        base300: '#E7E2DF',
        beige0: '#fff9f2',
        beige1: '#ffe0a6',
        beige2: '#f7dba6',
        beige3: '#f7c972',
        blue1: '#1fb6ff',
        blue2: '#3ABFF8',

        brown1: '#917b50',
        brown2: '#6e4d10',
        brown3: '#63563c',
        brown4: '#403a2e',
        default: '#A8A29E',

        gray: '#8492a6',

        symbol1: '#F5B989',
        symbol2: '#633B2E',

        text1: '#172337',
        text2: '#291334',
        text3: '#291334',
        yellow3: '#DA9413',
      },
      container: {
        center: true,
      },
      fontFamily: {
        'hanalei-fill': ['var(--font-hanalei-fill)', 'sans-serif'],
      },
      fontSize: {
        '2xl': '1.5rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        base: '1rem',
        lg: '1.2rem',
        md: '1rem',
        sm: '0.8rem',
        xl: '1.25rem',
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
    },
  },
};
