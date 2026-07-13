import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ink: "#07111f", electric: "#4f7cff", aqua: "#60e6d2" },
      fontFamily: { sans: ["var(--font-manrope)"], display: ["var(--font-space)"] }
    }
  },
  plugins: []
} satisfies Config;
