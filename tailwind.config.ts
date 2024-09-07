import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur:{
        'glass':'30px'
      },
      animation: {
        spinLoop: 'spin 7s linear infinite',
      },
      boxShadow:{
        'mainBox':'0px 0px 10px 2px black, inset 0px 0px 15px 1px white',
      }
    },
  },
  plugins: [],
};
export default config;
