module.exports = {
  verbose: true, // 개별 테스트 결과를 계층적으로 보여준다.

  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js', // import 시, ".css"을 하면 styleMock.js를 가져온다.
  },
};
