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
        primary: {
          DEFAULT: "#386641", // Deep green as the main brand color
          light: "#6A994E", // A lighter green for highlights
          dark: "#2A4E30", // A darker shade for contrast
        },
        secondary: {
          DEFAULT: "#A23133", // Bordeaux red as a strong complementary color
          light: "#C45355", // A lighter red for accents
          dark: "#7D262A", // A deep, rich red for contrast
        },
        accent: {
          DEFAULT: "#A7C957", // Vibrant green for highlights
          light: "#C2DA85", // Lighter green for softer accents
          dark: "#879C45", // A deeper green for stronger contrast
        },
        neutral: {
          DEFAULT: "#2A2A2A", // Dark gray for text
          light: "#F6F6F6", // Warm beige for backgrounds
          dark: "#1B1B1B", // Almost black for dark mode
        },
        success: "#6A994E", // Green for success messages
        warning: "#E7B10A", // Yellow-orange for warnings
        danger: "#A23133", // Strong red for errors, consistent with secondary
      },
    },
  },
  plugins: [],
} satisfies Config;
