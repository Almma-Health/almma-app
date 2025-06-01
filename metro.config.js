// metro.config.js
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

//   config.resolver.extraNodeModules = {
//     // Redirect `require("http")` → the npm shim
//     http: path.resolve(__dirname, "node_modules/http-browserify"),
//     crypto: path.resolve(__dirname, "node_modules/crypto-browserify"),
//     https: path.resolve(__dirname, "node_modules/https-browserify"),
//     url: path.resolve(__dirname, "node_modules/url"),
//     buffer: path.resolve(__dirname, "node_modules/buffer/"),
//     process: path.resolve(__dirname, "node_modules/process/browser.js"),
//     events: path.resolve(__dirname, "node_modules/events"),
//     stream: path.resolve(__dirname, "node_modules/stream-browserify"),
//   };

  return config;
})();
