module.exports = {
  preset: 'jest-expo',
  testPathIgnorePatterns: ['/node_modules', '/android', '/ios'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native-google-signin/google-signin)',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components',
    './jest.setup.js',
  ],
};
