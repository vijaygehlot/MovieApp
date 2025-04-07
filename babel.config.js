module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // 👇 Reanimated plugin must be LAST in this list
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
