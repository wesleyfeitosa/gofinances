module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: [
    "/node_modules/",
       "/android",
     "/ios",
     "/__tests__/helpers/",
     "/__tests__/__mocks__/",
  ],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|@react-native-google-signin/google-signin)',
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components",
    "./jest.setup.js"
  ],
};