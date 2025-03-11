import Component from '../core/Component.ts';
import { SortType } from '../lib/types.ts';

interface RestaurantSortSelectProps {
  sort: SortType;
  setSort: (sort: SortType) => void;
}

export const SORTS: SortType[] = ['이름순', '거리순'];

export default class RestaurantSortSelect extends Component<null, RestaurantSortSelectProps> {
  template() {
    return `
      <select name="sort" id="sort" >
        ${SORTS.map(
          (sort) => `
          <option value="${sort}" ${this.props?.sort === sort ? 'selected' : ''}>${sort}</option>
        `,
        ).join('')}
      </select>
    `;
  }

  attachEventListener() {
    this.element?.querySelector('#sort')?.addEventListener('change', (event) => {
      this.props?.setSort((event?.target as HTMLSelectElement)?.value as SortType);
    });
  }
}
