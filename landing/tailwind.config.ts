import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF5A1F",
          "orange-dark": "#E64A0F",
          "orange-light": "#FF7A45",
          black: "#0A0A0A",
          "black-soft": "#141414",
          "black-elevated": "#1C1C1C",
          gray: "#8A8A8A",
          "gray-light": "#B8B8B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slow-pulse": "slowPulse 4s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "orbit": "orbit 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slowPulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        gradientShift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(30px, -30px) scale(1.1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(50px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(50px) rotate(-360deg)" },
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #FF5A1F 0%, #E64A0F 100%)",
        "dark-gradient": "linear-gradient(180deg, #0A0A0A 0%, #141414 100%)",
        "shimmer-gradient":
          "linear-gradient(90deg, transparent 0%, rgba(255, 90, 31, 0.3) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
