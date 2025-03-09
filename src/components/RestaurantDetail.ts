import Component from '../core/Component.ts';
import { FilterType, SortType } from '../Application.ts';

interface RestaurantDetailProps {
  filter: FilterType;
  sort: SortType;
  setFilter: (filter: FilterType) => void;
  setSort: (sort: SortType) => void;
}

export default class RestaurantDetail extends Component<null, RestaurantDetailProps> {
  template() {
    return `
      <div class="restaurant-filter-container">
        <select name="filter" id="filter" class="restaurant-filter">
          <option value="전체" >전체</option>
          <option value="한식" ${this.props.filter === '한식' ? 'selected' : ''} >한식</option>
          <option value="중식" ${this.props.filter === '중식' ? 'selected' : ''} >중식</option>
          <option value="일식" ${this.props.filter === '일식' ? 'selected' : ''} >일식</option>
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
    this.element?.querySelector('#filter')?.addEventListener('change', (event) => {
      this.props.setFilter((event?.target as HTMLSelectElement)?.value as FilterType);
    });
    this.element?.querySelector('#sort')?.addEventListener('change', (event) => {
      this.props.setSort((event?.target as HTMLSelectElement)?.value as SortType);
    });
  }
}
