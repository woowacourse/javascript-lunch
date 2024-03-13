import ValidateConditions from '../../src/validators/ValidateConditions.ts';

describe('유효성 검증 테스트', () => {
  it('배열 안에 값이 포함되어있는 경우 true를 반환한다.', () => {
    const inputs = [30, '한식'];
    const datas = [
      [5, 10, 15, 20, 30],
      ['한식', '중식', '일식', '아시안', '양식', '기타'],
    ];

    datas.forEach((data, index) => {
      expect(ValidateConditions.isIncluded(data, inputs[index])).to.be.true;
    });
  });

  it('값이 빈 문자열인 경우 true를 반환한다.', () => {
    const input = '';

    expect(ValidateConditions.isBlank(input)).to.be.true;
  });
});
