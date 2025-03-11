import Component from '../core/Component.ts';
import { CategoryType } from '../lib/types.ts';

interface RestaurantFilterProps {
  filter: CategoryType;
  setFilter: (filter: CategoryType) => void;
}

const CATEGORIES: CategoryType[] = ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'];

export default class RestaurantFilter extends Component<null, RestaurantFilterProps> {
  template() {
    return `
      <select name="filter" id="filter" class="restaurant-filter">
        ${CATEGORIES.map(
          (category) => `
          <option value="${category}" ${this.props?.filter === category ? 'selected' : ''}>${category}</option>
        `,
        ).join('')}
      </select>
    `;
  }

  attachEventListener() {
    this.element?.querySelector('#filter')?.addEventListener('change', (event) => {
      this.props?.setFilter((event?.target as HTMLSelectElement)?.value as CategoryType);
    });
  }
}
