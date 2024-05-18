/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both"
      },
      keyframes: {
        flip: {
          to: {
            transform: "rotate(360deg)"
          }
        },
        rotate: {
          to: {
            transform: "rotate(90deg)"
          }
        }
      }
    },
  },
  plugins: [],
}

