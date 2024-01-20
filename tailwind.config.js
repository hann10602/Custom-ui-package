export default {
  //jit mode
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],

  // affected files
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // config own styles
      spacing: {
        39: "40px",
        sm: "100px",
      },
      colors: {
        custom: "#51cf92",
      },
    },
    plugins: [],
  },
};
