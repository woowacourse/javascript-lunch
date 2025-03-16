import createElement from '../utils/createElement.js';

function createFilterBox({ onCategoryChange, onSortChange }) {
  const $filterContainer = createElement('section', 'restaurant-filter-container');

  const $categoryFilter = createElement('select', 'restaurant-filter', null, {
    name: 'category',
    id: 'category-filter',
  });

  const categoryOptions = ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'];
  categoryOptions.forEach((category) => {
    const $option = createElement('option', null, category, { value: category });
    $categoryFilter.appendChild($option);
  });

  const $sortFilter = createElement('select', 'restaurant-filter', null, {
    name: 'sorting',
    id: 'sorting-filter',
  });

  const sortOptions = [
    { label: '이름순', value: 'name' },
    { label: '거리순', value: 'distance' },
  ];

  sortOptions.forEach(({ label, value }) => {
    const $option = createElement('option', null, label, { value });
    $sortFilter.appendChild($option);
  });

  $categoryFilter.addEventListener('change', (event) => onCategoryChange(event.target.value));
  $sortFilter.addEventListener('change', (event) => onSortChange(event.target.value));

  $filterContainer.append($categoryFilter, $sortFilter);
  return $filterContainer;
}

export default createFilterBox;
