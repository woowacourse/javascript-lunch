import Component from '../core/Component.ts';
import { CategoryType } from '../lib/types.ts';

interface RestaurantFilterProps {
  filter: CategoryType;
  setFilter: (filter: CategoryType) => void;
}

export default class RestaurantFilter extends Component<null, RestaurantFilterProps> {
  template() {
    return `
      <select name="filter" id="filter" class="restaurant-filter">
        <option value="전체" >전체</option>
        <option value="한식" ${this.props?.filter === '한식' ? 'selected' : ''} >한식</option>
        <option value="중식" ${this.props?.filter === '중식' ? 'selected' : ''} >중식</option>
        <option value="일식" ${this.props?.filter === '일식' ? 'selected' : ''} >일식</option>
        <option value="양식" ${this.props?.filter === '양식' ? 'selected' : ''} >양식</option>
        <option value="아시안" ${this.props?.filter === '아시안' ? 'selected' : ''}>아시안</option>
        <option value="기타" ${this.props?.filter === '기타' ? 'selected' : ''} >기타</option>
      </select>
    `;
  }

  attachEventListener() {
    this.element?.querySelector('#filter')?.addEventListener('change', (event) => {
      this.props?.setFilter((event?.target as HTMLSelectElement)?.value as CategoryType);
    });
  }
}
