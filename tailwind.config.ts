import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B35",
          foreground: "#FFFFFF",
          50: "#FFF4F0",
          100: "#FFE8E0",
          200: "#FFD4C4",
          300: "#FFB399",
          400: "#FF8A66",
          500: "#FF6B35",
          600: "#E55A2B",
          700: "#C24A23",
          800: "#9E3D1F",
          900: "#82351C",
        },
        gray: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D9D9D9",
          400: "#A3A3A3",
          500: "#8C8C8C",
          600: "#6B6B6B",
          700: "#4A4A4A",
          800: "#333333",
          900: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "Pretendard", "Noto Sans KR", "sans-serif"],
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
