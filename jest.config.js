module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: ".",
  testRegex: ".e2e-spec.ts$", // Regular expression pattern Jest uses to detect test files
  transform: {
    "^.+\\.ts$": "ts-jest", // Transform .ts files using ts-jest
  },
  collectCoverageFrom: ["src/**/*.(js|ts)", "!src/**/*.spec.ts", "!src/**/*.module.ts"], // Coverage settings
  coverageDirectory: "./coverage",
  testEnvironment: "node", // Test environment (could be jsdom, node, etc.)
};
