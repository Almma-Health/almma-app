// metro.config.js
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...config.resolver.alias,
  'stream': 'react-native-stream',
  'crypto': 'react-native-crypto',
  events: require.resolve('events'),
};

config.resolver.platforms = ['native', 'web', 'ios', 'android'];

module.exports = config;

