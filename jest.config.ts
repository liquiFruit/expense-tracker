import NextJest from "next/jest"

const createJestConfig = NextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
}

export default createJestConfig(customJestConfig)
