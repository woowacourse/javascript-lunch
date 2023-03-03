import selectTemplate from '../template/selectTemplate';

export default function Filters($root, eventListener) {
  const $filterSection = document.createElement('section');
  $filterSection.className = 'restaurant-filter-container';

  this.state = {
    category: '전체',
    filter: '이름순',
  };

  this.init = () => {
    this.render();
    $filterSection.addEventListener('change', eventListener);
    $root.appendChild($filterSection);
  };

  this.render = () => {
    $filterSection.innerHTML = `
    ${selectTemplate({
      name: 'category',
      id: 'category-filter',
      options: [
        { value: '전체', text: '전체' },
        { value: '한식', text: '한식' },
        { value: '중식', text: '중식' },
        { value: '일식', text: '일식' },
        { value: '양식', text: '양식' },
        { value: '아시안', text: '아시안' },
        { value: '기타', text: '기타' },
      ],
      selected: this.state.category,
      className: 'restaurant-filter',
    })}
    ${selectTemplate({
      name: 'sorting',
      id: 'sorting-filter',
      options: [
        { value: '이름순', text: '이름순' },
        { value: '거리순', text: '거리순' },
      ],
      selected: this.state.filter,
      className: 'restaurant-filter',
    })}
  `;
  };

  this.setState = (state) => {
    this.state = { ...this.state, ...state };
    this.render();
  };

  this.init();
}
