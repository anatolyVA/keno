/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scale: {
        200: "2.00",
      },
      gridTemplateRows: {
        13: "repeat(13, minmax(0, 1fr))",
      },
      gridRow: {
        "span-13": "span 13 / span 13",
      },
    },
  },
  plugins: [],
};
