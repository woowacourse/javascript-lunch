const FORM_INPUT_QUERY = ['#category', '#name', '#distance', '#description', '#link'];

const CATEGORY_CONVERTER = {
  한식: 'korean',
  중식: 'chinese',
  일식: 'japanese',
  아시안: 'asian',
  양식: 'western',
  기타: 'etc',
};

const LOCAL_STORAGE_KEY = 'restaurantList';

const TAB_MENUS = [
  { id: 'all', content: '모든 음식점' },
  { id: 'favorite', content: '자주 가는 음식점' },
];

export { FORM_INPUT_QUERY, CATEGORY_CONVERTER, LOCAL_STORAGE_KEY, TAB_MENUS };
