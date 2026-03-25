import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fond ultra-sombre
        bg: "#080808",
        // Orange vif — accent principal
        accent: "#FF3B00",
        "accent-hover": "#FF5A2A",
        // Surfaces
        surface: "#111111",
        "surface-2": "#1A1A1A",
        border: "#222222",
        "border-light": "#2E2E2E",
        // Texte
        "text-primary": "#F5F5F5",
        "text-secondary": "#888888",
        "text-muted": "#444444",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "scroll-feed": "scrollFeed 30s linear infinite",
        "count-up": "countUp 0.5s ease-out forwards",
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
      },
      keyframes: {
        scrollFeed: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
