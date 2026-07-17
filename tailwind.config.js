/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          secondary: "#0D9488",
          tertiary: "#F59E0B",
          neutral: "#F8FAFC"
        },
        lake: {
          50: "#f4fbfd",
          100: "#daf4f7",
          500: "#2aa7c8",
          700: "#1a5f8a",
          900: "#0f2f4f"
        },
        sand: "#f5e8c7"
      },
      boxShadow: {
        glow: "0 20px 80px rgba(42, 167, 200, 0.25)"
      }
    }
  },
  plugins: []
};
