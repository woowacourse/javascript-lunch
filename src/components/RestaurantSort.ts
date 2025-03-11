import Component from '../core/Component.ts';
import { SortType } from '../lib/types.ts';

interface RestaurantSortProps {
  sort: SortType;
  setSort: (sort: SortType) => void;
}

export default class RestaurantSort extends Component<null, RestaurantSortProps> {
  template() {
    return `
      <select name="sort" id="sort">
        <option value="이름순" ${this.props?.sort === '이름순' ? 'selected' : ''}>이름순</option>
        <option value="거리순" ${this.props?.sort === '거리순' ? 'selected' : ''}>거리순</option>
      </select>
    `;
  }

  attachEventListener() {
    this.element?.querySelector('#sort')?.addEventListener('change', (event) => {
      this.props?.setSort((event?.target as HTMLSelectElement)?.value as SortType);
    });
  }
}
