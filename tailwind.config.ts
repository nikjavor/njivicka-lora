import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#fffffe",
        "heading-color": "#094067",
        "text-color": "#272d33",
        "main-color": "#fffffe",
        "secondary-color": "#df93e1",
        "accent-color": "#7b37c8",
      },
    },
  },
  plugins: [],
} satisfies Config;
