import Component from './Component';

class FilterBoxContainer extends Component {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {
    return `
      <section class="restaurant-filter-container">
          <filter-box type="category" option="${[
            '전체',
            '한식',
            '중식',
            '일식',
            '아시안',
            '양식',
            '기타',
          ]}"></filter-box>
          <filter-box type="sorting" option="${['이름순', '거리순']}"></filter-box>
      </section>
    `;
  }
}

export default FilterBoxContainer;
