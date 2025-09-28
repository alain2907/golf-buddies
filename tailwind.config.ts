import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        golf: {
          green: "#2D5016",
          light: "#4A7C2E",
          fairway: "#8FBC8F",
          sand: "#F4E4C1",
          sky: "#87CEEB",
          rough: "#355E3B",
          tee: "#FF6B6B"
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}
export default config