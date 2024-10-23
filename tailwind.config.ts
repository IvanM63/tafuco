import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: "0%", transform: "translateY(-10px)" },
          to: { opacity: "100%", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)", // Set default primary color to 800
        primary: {
          "50": "#F8F7FB",
          "100": "#D4D0F4",
          "200": "#C6C2F1",
          "300": "#B9B3EE",
          "400": "#ACA5EB",
          "500": "#A097E7",
          "600": "#978EE5",
          "700": "#897FE1",
          "800": "#7C71DF",
          "900": "#6f59d2",
          "950": "#5f4ab8",
          DEFAULT: "#7C71DF",
        },
        secondary: "#F8F7FB",
        tertiary: "#686A74",
        "tertiary-black": "#101010",
        red: "#F65061",
        orange: "#FD8B2B",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
export default config;
