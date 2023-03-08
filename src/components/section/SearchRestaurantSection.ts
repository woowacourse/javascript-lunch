import { CustomSelectElement } from '..';
import { DEFAULT_FILTER_OPTIONS, DEFAULT_SORT_OPTIONS } from '../../fixtures';
import CustomElement from '../CustomElement';

class SearchRestaurantSection extends CustomElement {
  renderTemplate = () => {
    return `     
      <style>
        .restaurant-search-container {
          display: flex;
          justify-content: space-between;

          padding: 0 16px;
          margin-bottom: 24px;
        }
      </style>
      <section class="restaurant-search-container">
        <r-select id="restaurant-filter-select" name="filterRestaurant"></r-select>
        <r-select id="restaurant-sort-select" name="sortRestaurant"></r-select>
      </section>
    `;
  };

  render = () => {
    super.render();

    const $filterSelect = this.querySelector<CustomSelectElement>('#restaurant-filter-select');
    const $sortSelect = this.querySelector<CustomSelectElement>('#restaurant-sort-select');

    if (!$filterSelect || !$sortSelect) return;

    this.initSelect($filterSelect, $sortSelect);
    this.initEventHandlers($filterSelect, $sortSelect);
  };

  changeSearchFilterOption = ({ target }: Event) => {
    const { value } = target as HTMLSelectElement;

    this.dispatchSearchOption(value, 'changeFilter');
  };

  changeSearchSortOption = ({ target }: Event) => {
    const { value } = target as HTMLSelectElement;

    this.dispatchSearchOption(value, 'changeSort');
  };

  dispatchSearchOption = (value: string, option: string) => {
    this.dispatchEvent(
      new CustomEvent(option, {
        bubbles: true,
        detail: {
          value,
        },
      }),
    );
  };

  initEventHandlers = ($filterSelect: CustomSelectElement, $sortSelect: CustomSelectElement) => {
    $filterSelect.addEventListener('change', this.changeSearchFilterOption);
    $sortSelect.addEventListener('change', this.changeSearchSortOption);
  };

  initSelect = ($filterSelect: CustomSelectElement, $sortSelect: CustomSelectElement) => {
    $filterSelect.setInitialOptions(DEFAULT_FILTER_OPTIONS);
    $sortSelect.setInitialOptions(DEFAULT_SORT_OPTIONS);
  };
}

customElements.define('r-search-restaurant-section', SearchRestaurantSection);

export default SearchRestaurantSection;
