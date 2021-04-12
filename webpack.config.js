const path = require("path");
const fs = require("fs");

function entryMultiple() {
  const entry = {},
    base = "./src/",
    regexp = /\.js$/,
    files = fs.readdirSync(base);
  files.forEach((file) => {
    if (regexp.test(file)) {
      const name = file.slice(0, -3),
        to = path.resolve(base, file);
      entry[name] = to;
    }
  });
  return entry;
}

module.exports = {
  mode: "development",
  entry() {
    return entryMultiple();
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
