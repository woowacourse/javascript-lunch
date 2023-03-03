import { Category, SortCondition } from '../data/type';
import $ from '../util/dom';

class RestaurantFilter {
  #template;

  constructor() {
    this.#template = `<section class="restaurant-filter-container"></section>`;

    document.body.insertAdjacentHTML('beforeend', this.#template);
  }

  static setEventHandler(handler: (condition: SortCondition, category?: Category) => void) {
    $('.restaurant-filter-container').childNodes.forEach((node) => {
      node.addEventListener('change', (event) => {
        event.preventDefault();

        const selectedCondition = document.querySelector(
          '#sorting-filter  > option:checked',
        ) as HTMLInputElement;

        const selectedCategory = document.querySelector(
          '#category-filter > option:checked',
        ) as HTMLInputElement;

        selectedCategory.value === '전체'
          ? handler(selectedCondition.value as SortCondition)
          : handler(selectedCondition.value as SortCondition, selectedCategory.value as Category);
      });
    });
  }
}

export default RestaurantFilter;
