import FavoriteRestaurantList from '../../src/domain/FavoriteRestaurantList';
import Storage from '../../src/domain/Storage';

const favoriteRestaurantList = new FavoriteRestaurantList([], new Storage());
const newRestaurantId = 324;

describe('즐겨찾는 음식점 목록 테스트', () => {
  it('즐겨 찾는 음식점을 새로 추가한다.', () => {
    favoriteRestaurantList.add(newRestaurantId);

    expect(favoriteRestaurantList.has(newRestaurantId)).to.eq(true);
  });

  it('즐겨찾지 않는 음식점으로 설정한다.', () => {
    favoriteRestaurantList.delete(newRestaurantId);

    expect(favoriteRestaurantList.has(newRestaurantId)).to.eq(false);
  });

  it('즐겨 찾는 음식점 id 목록을 반환한다.', () => {
    favoriteRestaurantList.add(1);
    favoriteRestaurantList.add(2);

    expect(favoriteRestaurantList.getIdList()).to.eql([1, 2]);
  });
});
