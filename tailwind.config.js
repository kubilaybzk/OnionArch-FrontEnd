/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './Components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        Yellow: "#FFB400",
        Yellow2: "rgba(255, 180, 0, 0.95)",
        Black: "#2B2B2B",
        InputBg: "(rgb(232, 240, 254), rgba(70, 90, 126, 0.4))",
        Dark: "#18191A",
        DarkV2: "#3A3B3C",
        DarkV1: "#242526",
        ParagraphFont: "#767676",
        Background: "#F0F0F6",
        Background2: "#E4E6EB",
        White: "#FFFFFF",
      },
    },
  },
  plugins: [],
}
