module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["dist"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
}
