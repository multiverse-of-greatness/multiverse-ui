import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-50": "rgba(0, 0, 0, 0.5)",
        "black-75": "rgba(0, 0, 0, 0.75)",
        "black-80": "rgba(0, 0, 0, 0.8)",
        "black-90": "rgba(0, 0, 0, 0.9)",
        "white-50": "rgba(255, 255, 255, 0.5)",
        "white-75": "rgba(255, 255, 255, 0.75)",
        "white-80": "rgba(255, 255, 255, 0.8)",
        "white-90": "rgba(255, 255, 255, 0.9)",
      },
    },
  },
  plugins: [],
} satisfies Config;
