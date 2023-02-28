import { Restaurant } from '../../domain/Restaurants';

const correctInfo = {
  name: '친친',
  category: '중식',
  distance: 0,
  description: 'Since 2004 편리한 교통',
  link: 'https://chinchin.com',
};

const wrongInfo = {};

describe('주어진 정보로 생성된 음식점 모델 테스트', () => {
  test('음식점은 카테고리, 이름, 거리정보를 필수로 가져야 한다', () => {
    expect(() => {
      new Restaurant(wrongInfo as typeof correctInfo);
    }).toThrow();

    expect(new Restaurant(correctInfo).getInfo()).toEqual(correctInfo);
  });

  test('음식점의 특정 정보를 조회할 수 있다', () => {
    expect(new Restaurant(correctInfo).getSomeInfo('name')).toBe(correctInfo.name);
    expect(new Restaurant(correctInfo).getSomeInfo('category')).toBe(correctInfo.category);
  });

  test('음식점은 설명, 참고 링크 정보를 옵션으로 가질 수 있다', () => {
    expect(new Restaurant(correctInfo).getInfo()).toEqual(correctInfo);
  });
});
