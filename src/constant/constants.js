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

export { FORM_INPUT_QUERY, CATEGORY_CONVERTER, LOCAL_STORAGE_KEY };
