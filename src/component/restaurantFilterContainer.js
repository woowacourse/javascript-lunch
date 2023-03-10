import select from './select';

const restaurantFilterContainer = () => {
  const categoryOptions = [
    { value: '전체', content: '전체' },
    { value: '한식', content: '한식' },
    { value: '중식', content: '중식' },
    { value: '일식', content: '일식' },
    { value: '양식', content: '양식' },
    { value: '아시안', content: '아시안' },
    { value: '기타', content: '기타' },
  ];
  const sortingOptions = [
    { value: 'name', content: '이름순' },
    { value: 'distance', content: '거리순' },
  ];

  return `
    <section class="restaurant-filter-container">
      ${select({ id: 'category-filter', name: 'category', options: categoryOptions })}
      ${select({ id: 'sorting-filter', name: 'sorting', options: sortingOptions })}
    </section>
  `;
};

export default restaurantFilterContainer;
