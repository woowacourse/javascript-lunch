import { Restaurant } from '../types/Types';

const yeoptoRestaurant: Restaurant = {
  id: 'a1123124',
  category: '기타',
  name: '엽토네 떡볶이',
  distance: 5,
  description: '맛있다',
  link: 'yeopto.github.io',
  favorites: false,
};

const doriRestaurant: Restaurant = {
  id: 'a1123125',
  category: '한식',
  name: '도리네 집밥',
  distance: 15,
  description: '야무지다',
  link: 'undefined',
  favorites: false,
};

const gongwonRestaurant: Restaurant = {
  id: 'a1123126',
  category: '일식',
  name: '공원네 초밥집',
  distance: 10,
  description: 'is good',
  link: 'undefined',
  favorites: false,
};

export { yeoptoRestaurant, doriRestaurant, gongwonRestaurant };
