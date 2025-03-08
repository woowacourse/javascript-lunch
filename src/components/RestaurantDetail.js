import Component from '../core/Component.js';

export default class RestaurantDetail extends Component {
  template() {
    console.log(1, this.props.filter);
    return `
      <div class="restaurant-filter-container">
        <select name="filter" id="filter" class="restaurant-filter">
          <option value="" >전체</option>
          <option value="한식" ${this.props.filter === '한식' ? 'selected' : ''} >한식</option>
          <option value="중식" ${this.props.filter === '중식' ? 'selected' : ''} >중식</option>
          <option value="일식" ${this.props.filter === '양식' ? 'selected' : ''} >일식</option>
          <option value="양식" ${this.props.filter === '양식' ? 'selected' : ''} >양식</option>
          <option value="아시안" ${this.props.filter === '아시안' ? 'selected' : ''}>아시안</option>
          <option value="기타" ${this.props.filter === '기타' ? 'selected' : ''} >기타</option>
        </select>

        <select name="sort" id="sort">
          <option value="이름순" ${this.props.sort === '이름순' ? 'selected' : ''}>이름순</option>
          <option value="거리순" ${this.props.sort === '거리순' ? 'selected' : ''}>거리순</option>
        </select>
      </div>
    `;
  }
  onRender() {
    this.element.querySelector('#filter').addEventListener('change', (event) => {
      this.props.setFilter(event.target.value);
    });
    this.element.querySelector('#sort').addEventListener('change', (event) => {
      this.props.setSort(event.target.value);
    });
  }
}
