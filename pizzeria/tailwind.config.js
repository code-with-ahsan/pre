/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#fde047",
          secondary: "#4f46e5",
          accent: "#fb923c",
          neutral: "#ffffff",
          "base-100": "#111827",
          info: "#06b6d4",
          success: "#10b981",
          warning: "#d97706",
          error: "#e11d48",
        },
      },
    ],
  },
};
