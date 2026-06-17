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
        cyber: {
          bg: "#020617",       // Deep Slate/Navy Blue
          bgLight: "#0a192f",  // Deep slate navy lighter
          card: "rgba(10, 25, 47, 0.7)", // Glass card
          cyan: "#00f3ff",     // Neon Cyan
          orange: "#ff6c00",   // Electric Orange
          gray: "#8f9cae",     // High-tech slate gray
          alert: "#ef4444",    // Red alert
          success: "#10b981",  // Safe/Green indicator
          border: "rgba(6, 182, 212, 0.2)", // Neon cyan translucent border
          borderOrange: "rgba(255, 108, 0, 0.2)", // Neon orange translucent border
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        "cyan-glow": "0 0 15px rgba(0, 243, 255, 0.35)",
        "cyan-glow-lg": "0 0 25px rgba(0, 243, 255, 0.6)",
        "orange-glow": "0 0 15px rgba(255, 108, 0, 0.35)",
        "orange-glow-lg": "0 0 25px rgba(255, 108, 0, 0.6)",
        "red-glow": "0 0 15px rgba(239, 68, 68, 0.4)",
        "glass-shadow": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "cyber-pulse": "cyberPulse 2s infinite alternate",
        "orange-pulse": "orangePulse 2s infinite alternate",
        "scanline": "scanline 6s linear infinite",
        "grid-move": "gridMove 20s linear infinite",
        "glitch": "glitch 1s linear infinite",
        "flicker": "flicker 1.5s infinite alternate",
        "float": "float 3s ease-in-out infinite",
        "radar-spin": "spin 4s linear infinite",
        "text-glow": "textGlow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        cyberPulse: {
          "0%": { boxShadow: "0 0 5px rgba(0, 243, 255, 0.2)", borderColor: "rgba(0, 243, 255, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 243, 255, 0.6)", borderColor: "rgba(0, 243, 255, 0.8)" },
        },
        orangePulse: {
          "0%": { boxShadow: "0 0 5px rgba(255, 108, 0, 0.2)", borderColor: "rgba(255, 108, 0, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(255, 108, 0, 0.6)", borderColor: "rgba(255, 108, 0, 0.8)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        gridMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 100%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        flicker: {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            opacity: "1",
            filter: "drop-shadow(0 0 8px rgba(0, 243, 255, 0.6))",
          },
          "20%, 24%, 55%": {
            opacity: "0.5",
            filter: "none",
          },
        },
        textGlow: {
          "0%": { textShadow: "0 0 4px rgba(0, 243, 255, 0.4)" },
          "100%": { textShadow: "0 0 12px rgba(0, 243, 255, 0.8)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
