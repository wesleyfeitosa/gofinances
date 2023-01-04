module.exports = {
  preset: 'jest-expo',
  testPathIgnorePatterns: ['/node_modules', '/android', '/ios'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|expo(-.*)?|@react-native-google-signin/google-signin|@expo/vector-icons|@unimodules)/)',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components',
    './node_modules/@react-native-google-signin/google-signin/jest/build/setup.js',
    './jest.setup.js',
  ],
};
