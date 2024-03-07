import korean from '../../templates/category-korean.png';
import chinese from '../../templates/category-chinese.png';
import japanese from '../../templates/category-japanese.png';
import western from '../../templates/category-western.png';
import asian from '../../templates/category-asian.png';
import etc from '../../templates/category-etc.png';

const CATEGORY = [
  { value: '전체', text: '전체' },
  { value: '한식', text: '한식' },
  { value: '중식', text: '중식' },
  { value: '일식', text: '일식' },
  { value: '양식', text: '양식' },
  { value: '아시안', text: '아시안' },
  { value: '기타', text: '기타' },
];

const CATEGORY_IMG_SRC = {
  한식: korean,
  중식: chinese,
  일식: japanese,
  양식: western,
  아시안: asian,
  기타: etc,
};

const CATEGORY_ATTRIBUTE = { name: 'category', id: 'category-filter' };

const SORTING = [
  { value: 'name', text: '이름순' },
  { value: 'distance', text: '거리순' },
];

const SORTING_ATTRIBUTE = { name: 'sorting', id: 'sorting-filter' };

export { CATEGORY, CATEGORY_ATTRIBUTE, CATEGORY_IMG_SRC, SORTING, SORTING_ATTRIBUTE };
