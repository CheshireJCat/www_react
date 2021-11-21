const {
  override,
  addWebpackModuleRule,
  addWebpackAlias,
} = require("customize-cra");

const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src"),
  }),
  addWebpackModuleRule({
    test: /\.(jpg|png|gif)$/,
    use: [{ loader: "url-loader", options: { esModule: false } }],
  })
);
