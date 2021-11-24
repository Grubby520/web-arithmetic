const path = require("path");
const fs = require("fs");
const folders = {
  sort: 'sort',
  base: 'base',
  antv: 'antv'
}

const folder = folders.base;

function entryMultiple() {
  const entry = {},
    base = `./src/${folder}/`,
    regexp = /\.(js|ts)$/,
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
    filename: `${folder}/[name].bundle.js`,
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
};
