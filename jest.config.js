export default {
  testEnvironment: "node", // Use node environment for testing
  transform: {
    "^.+\\.js$": "babel-jest", // Use babel-jest to transform .js files
  },
  moduleFileExtensions: ["js", "json", "node"],
};
