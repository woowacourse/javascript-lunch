import RestaurantListItem, { TCategory } from '../../domain/RestaurantListItem';
import RestaurantList from '../RestaurantListSection';
import { ID } from '../../constants';

const FilterButton = {
  template() {
    return `
      <select name="category" id="${ID.CATEGORY_FILTER}" class="restaurant-filter">
        <option value="전체" selected>전체</option>
        <option value="한식">한식</option>
        <option value="중식">중식</option>
        <option value="일식">일식</option>
        <option value="양식">양식</option>
        <option value="아시안">아시안</option>
        <option value="기타">기타</option>
      </select>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    this.handleCategoryFilter(RestaurantListItem);
  },
  handleCategoryFilter(RestaurantListItem: RestaurantListItem) {
    const categoryFilter = document.querySelector(`#${ID.CATEGORY_FILTER}`) as HTMLSelectElement;

    categoryFilter?.addEventListener('change', () => {
      const select = categoryFilter.options[categoryFilter.selectedIndex].value as TCategory | '전체';
      RestaurantListItem.setFilter(select);
      const result = RestaurantListItem.filterAndSort();

      RestaurantList.update(RestaurantListItem, result);
    });
  },
};

export default FilterButton;
