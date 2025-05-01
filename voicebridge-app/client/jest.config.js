export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      // Handle CSS imports (with CSS modules)
      '\\.module\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      // Handle CSS imports (without CSS modules)
      '\\.(css|less|scss|sass)$': '<rootDir>/src/__mocks__/styleMock.js',
      // Handle static assets
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
      // Handle module aliases (if you use them)
      '^/src/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/'],
    moduleDirectories: ['node_modules', 'src'],
    testEnvironmentOptions: {
      url: 'http://localhost'
    }
  };