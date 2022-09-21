const withMT = require("@material-tailwind/react/utils/withMT");
console.log(withMT)

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
