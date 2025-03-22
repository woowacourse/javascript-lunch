import CategoryFilter from './components/CategoryFilter';
import SortingFilter from './components/SortingFilter';

class RestaurantFilterContainer {
  private element: HTMLElement;
  private categoryFilter: CategoryFilter;
  private sortingFilter: SortingFilter;

  constructor(onCategoryChange?: (category: string) => void, onSortingChange?: (sortBy: string) => void) {
    this.element = this.#createContainer();
    this.categoryFilter = new CategoryFilter(onCategoryChange);
    this.sortingFilter = new SortingFilter(onSortingChange);

    this.element.appendChild(this.categoryFilter.getElement());
    this.element.appendChild(this.sortingFilter.getElement());
  }

  #createContainer(): HTMLElement {
    const container = document.createElement('section');
    container.classList.add('restaurant-filter-container');
    return container;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getCategoryValue(): string {
    return this.categoryFilter.getValue();
  }

  getSortingValue(): string {
    return this.sortingFilter.getValue();
  }
}

export default RestaurantFilterContainer;
