import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customGreen: "#91DDCF",
        customCream: "#F5F4C6",
        CustomPink2: "#F19ED2",
        CustomPink1: "#E8C5E5",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
