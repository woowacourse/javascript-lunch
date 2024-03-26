/**
 * 데이터를 주입한다.
 * 데이터가 없으면 1부터 시작한다.
 * 데이터가 있으면 생성시 제일 큰 ID + 1한 값부터 반환한다.
 */

import { Restaurant } from '../../src/domain/interface/Restaurant';
import IdGenerator from '../../src/domain/IdGenerator';

const localStorageRestaurantList: Restaurant[] = [
  {
    id: 1,
    category: '한식',
    name: '바',
    walkingTime: 5,
  },
  {
    id: 2,
    category: '한식',
    name: '가',
    walkingTime: 5,
  },
  {
    id: 3,
    category: '한식',
    name: '나',
    walkingTime: 5,
  },
  {
    id: 4,
    category: '한식',
    name: '마녀김밥',
    walkingTime: 5,
  },
];

describe('아이디 생성기 테스트', () => {
  it('입력된 데이터에서 연속되도록 아이디를 반환한다.', () => {
    const idGenerator = new IdGenerator(localStorageRestaurantList);
    const expectedNewIdList = [5, 6, 7];

    // TODO: testEach로 리펙토링
    expect(idGenerator.generateNewId()).to.eq(expectedNewIdList[0]);
    expect(idGenerator.generateNewId()).to.eq(expectedNewIdList[1]);
    expect(idGenerator.generateNewId()).to.eq(expectedNewIdList[2]);
  });
});
