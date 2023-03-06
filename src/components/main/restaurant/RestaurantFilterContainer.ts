import { Category, SortBy } from '../../../type';
import Component from '../../Component';
import { CATEGORIES } from '../../../utils/constants';

interface RestaurantFilterContainerProps {
  currentCategory: Category;
  currentSortBy: SortBy;
  onChangeCategory: (e: Event) => void;
  onChangeSortBy: (e: Event) => void;
}

interface RestaurantFilterContainerState {}

class RestaurantFilterContainer extends Component<
  RestaurantFilterContainerProps,
  RestaurantFilterContainerState
> {
  constructor($parent: HTMLElement, props: RestaurantFilterContainerProps) {
    super({ $parent, props, tagName: 'section', initialState: {} });
    this.$wrapper.className = 'restaurant-filter-container';
  }

  drawInnerHTML() {
    const { currentCategory, currentSortBy } = this.props;
    return `
      <select name="category" id="category-filter" class="restaurant-filter">
        ${CATEGORIES.map(
          (category) => `
            <option value="${category}" ${
            currentCategory === category ? 'selected' : ''
          }>${category}</option>
          `
        ).join('')}
      </select>
      <select name="sorting" id="sorting-filter" class="restaurant-filter">
        <option value="name" ${currentSortBy === 'name' ? 'selected' : ''}>이름순</option>
        <option value="distance" ${currentSortBy === 'distance' ? 'selected' : ''}>거리순</option>
      </select>
    `;
  }

  addEvent() {
    this.$('#category-filter')?.addEventListener('change', this.props.onChangeCategory);
    this.$('#sorting-filter')?.addEventListener('change', this.props.onChangeSortBy);
  }
}

export default RestaurantFilterContainer;
