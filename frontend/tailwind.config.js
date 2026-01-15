/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
        colors: {
            bg: "#FDF4F8",          // soft blush background
            cardPink: "#FCE7F3",    // pastel pink
            cardLavender: "#EDE9FE",// pastel lavender
            primary: "#C7D2FE",
            secondary: "#FBCFE8",
            text: "#1F2937",
  }
}

  },
  plugins: [],
};
