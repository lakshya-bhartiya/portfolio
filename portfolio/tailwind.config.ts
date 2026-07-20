/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        base: {
          DEFAULT: "#09090B",
          soft: "#111827",
          card: "#18181B",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          muted: "#CBD5E1",
          dim: "#71717A",
        },
        brand: {
          blue: "#3B82F6",
          cyan: "#06B6D4",
          violet: "#8B5CF6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(115deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)",
        "aurora": "radial-gradient(60% 50% at 20% 20%, rgba(59,130,246,0.25), transparent), radial-gradient(50% 40% at 80% 10%, rgba(139,92,246,0.22), transparent), radial-gradient(50% 50% at 60% 80%, rgba(6,182,212,0.18), transparent)",
        "noise": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-40px) scale(1.1)" },
          "66%": { transform: "translate(-20px,20px) scale(0.95)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        blob: "blob 12s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
    },
  },
  plugins: [],
};
