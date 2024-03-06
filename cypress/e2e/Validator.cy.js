describe('유효성 검증 테스트', () => {
  it('배열 안에 값이 포함되어있다면 true를 반환하는 테스트', () => {
    const inputs = [30, '한식'];
    const datas = [
      [5, 10, 15, 20, 30],
      ['한식', '중식', '일식', '아시안', '양식', '기타'],
    ];

    datas.forEach((data, index) => {
      expect(ValidateConditions.isIncluded(data, inputs[index])).to.be.true;
    });
  });
});
