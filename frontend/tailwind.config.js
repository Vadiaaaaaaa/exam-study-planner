/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F8FAFC",
        card: "#FFFFFF",
        primary: "#C7D2FE",   // lavender
        secondary: "#BAE6FD", // baby blue
        accent: "#FBCFE8",    // soft pink
        text: "#1F2937"
      }
    }
  },
  plugins: [],
};
