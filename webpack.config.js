const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/bubblingSort.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
