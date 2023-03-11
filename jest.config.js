module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/__mocks__/browserMocks.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
