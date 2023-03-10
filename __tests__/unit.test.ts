import mockList from '../src/data/mockRestaurant';

import RestaurantListItem, { IRestaurant } from '../src/domain/RestaurantListItem';

const [mockAsian, mockChina, mockKorea, mockJapan, mockEtc, mockWestern, mock1, mock2, mock3, mock4] = mockList;

const mockFavorite = {
  id: '2',
  category: '일식',
  name: '일일일',
  distance: 15,
  description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
  곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
  메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
  link: 'https://naver.me/G6DyD9tg',
  favorite: true,
};

const mockHate = {
  id: '3',
  category: '일식',
  name: '일일일',
  distance: 15,
  description: `평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는
  곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표
  메뉴지만, 할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의 역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은 만큼 덜어 먹을 수 있게 준비돼 있다.`,
  link: 'https://naver.me/G6DyD9tg',
  favorite: false,
};

describe('음식점 리스트를 관리하는 도메인 로직 테스트', () => {
  test('음식점 리스트를 만들어 꺼내면, 같은 리스트가 나온다.', () => {
    const result = new RestaurantListItem(mockList).getListItem();

    expect(result).toEqual(mockList);
  });

  test('음식점 리스트의 필터가 양식과 name이면, 이름순으로 정렬된 양식 리스트가 나온다.', () => {
    const list = new RestaurantListItem(mockList);
    list.setFilter('양식');
    list.setSort('name');

    const result = list.filterAndSort();

    expect(result).toEqual([mockWestern, mock3]);
  });

  test('음식점 리스트의 필터가 일식과 distance이면, 거리순으로 정렬된 일식 리스트가 나온다.', () => {
    const list = new RestaurantListItem(mockList);
    list.setFilter('일식');
    list.setSort('distance');

    const result = list.filterAndSort();

    expect(result).toEqual([mock2, mockJapan]);
  });

  test.each([
    ['1', mockKorea],
    ['2', mockJapan],
    ['3', mockWestern],
  ])('음식점 리스트의 id를 통해 해당 id의 음식점 객체 정보를 받아올 수 있다.', (id, expectValue) => {
    const list = new RestaurantListItem(mockList);

    const result = list.getItemByDataId(id);

    expect(result).toEqual(expectValue);
  });

  test('자주 가는 음식점 목록을 불러 올 수 있다.', () => {
    const list = new RestaurantListItem([mockFavorite, mockHate] as IRestaurant[]);

    const result = list.getFavoriteListItem();

    expect(result).toEqual([mockFavorite]);
  });
});
