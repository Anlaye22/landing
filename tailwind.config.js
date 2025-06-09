/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  darkMode: ["selector", "[data-web-theme=dark]"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#f35f38", // nuevo color principal
          color: "#fff",
          light: {
            1: "#fff5f2",
            2: "#ffe6de",
            3: "#ffd3c5",
            4: "#ffbfa9",
            5: "#fcae94",
            6: "#f79b7c",
            7: "#f28865",
            8: "#ed7351",
            9: "#f35f38", // base
            10: "#db5432",
            11: "#c2492d",
            12: "#8c311f"
          },
          dark: {
            1: "#29130f",
            2: "#3b1c14",
            3: "#532417",
            4: "#6b2d19",
            5: "#85351c",
            6: "#9f3e1f",
            7: "#ba4822",
            8: "#d5532d",
            9: "#f35f38", // base
            10: "#ff7755",
            11: "#ffb7a1",
            12: "#ffe9e2"
          },
        },
        body: {
          light: {
            1: "#fcfcfd",
            2: "#f9f9fb",
            3: "#eff0f3",
            4: "#e7e8ec",
            5: "#e0e1e6",
            6: "#d8d9e0",
            7: "#cdced7",
            8: "#b9bbc6",
            9: "#8b8d98",
            10: "#80828d",
            11: "#62636c",
            12: "#1e1f24",
          },
          dark: {
            1: "#212224",
            2: "#28292b",
            3: "#303134",
            4: "#36373b",
            5: "#3c3d42",
            6: "#43444a",
            7: "#4f5058",
            8: "#666872",
            9: "#72747f",
            10: "#7d7f8a",
            11: "#b4b6bf",
            12: "#eeeef0",
          },
        },
      },
      borderColor: {
        alpha: {
          light: "#00073527",
          dark: "#d6dbfc2f",
        },
      },
      backgroundColor: {
        body: {
          striped: {
            light: "#00005506",
            dark: "#adc5f30f",
          },
        },
      },
      boxShadow: {
        "card-1": "0px 0px 40px 0px rgba(0, 0, 0, 0.08)",
        "card-2": "0px 10px 20px 0 rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
