import { Restaurant } from '../src/type/common';

const menu1: Restaurant = {
  id: 1,
  category: '양식',
  name: '카페베네',
  distance: '10',
  description: '너무 맛있어',
  link: 'https://machogalbi.com',
  favorite: true,
};

const menu2: Restaurant = {
  id: 2,
  category: '한식',
  name: '마초갈비',
  distance: '20',
  description: '너무 맛있어',
  link: 'https://machogalbi.com',
  favorite: true,
};

const menu3: Restaurant = {
  id: 3,
  category: '중식',
  name: '간다간다뿅간다 짜장',
  distance: '30',
  description: '너무 맛있어',
  link: 'https://machogalbi.com',
  favorite: false,
};

const menu4: Restaurant = {
  id: 4,
  category: '양식',
  name: '알리오올리오 잘하는 집',
  distance: '5',
  description: '너무 맛있어',
  link: 'https://machogalbi.com',
  favorite: true,
};

export { menu1, menu2, menu3, menu4 };
