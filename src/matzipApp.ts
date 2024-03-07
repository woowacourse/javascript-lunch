import Matzip from './matzip';
import matzipList from './mock/restaurants';
import DOM from './utils/DOM';
import { FilterChangeEvent } from './components/FilterContainer';
import Restaurant from './components/Restaurant';
import { CategoryType, SortType, Restaurant as RestaurantType } from './types';

const { $, $$ } = DOM;

const matzipApp = {
  init() {
    const matzip = new Matzip(matzipList);
    this.initList(matzip);
    this.openModal();
    this.listenCategoryChange(matzip);
    this.listenRestaurantAdd(matzip);
  },

  initList(matzip: Matzip) {
    document.addEventListener('DOMContentLoaded', () => {
      const initSort = $('#sorting-filter') as HTMLSelectElement;
      const sortBy = initSort.options[initSort.selectedIndex].value;

      matzip.filterAndSort('전체', sortBy as SortType).forEach((restaurant) => {
        $('.restaurant-list-container')?.appendChild(new Restaurant(restaurant));
      });
    });
  },

  listenCategoryChange(matzip: Matzip) {
    document.addEventListener('filterChange', (event: Event) => {
      Array.from($$('.restaurant')).map((node) => node.remove());

      const customEvent = event as FilterChangeEvent;
      const selectedCategory = customEvent.detail.selectedCategory;
      const selectedSort = customEvent.detail.selectedSort;
      const restaurants = matzip.filterAndSort(
        selectedCategory as CategoryType,
        selectedSort as SortType,
      );
      restaurants.forEach((restaurant) => {
        $('.restaurant-list-container')?.appendChild(new Restaurant(restaurant));
      });
    });
  },

  listenRestaurantAdd(matzip: Matzip) {
    $('#restaurant-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const fieldValues = Array.from($$('.form-item')).map((item) => {
        const field = item.children[1];
        if (field instanceof HTMLSelectElement) {
          return field.options[field.selectedIndex].value;
        }
        if (field instanceof HTMLInputElement) {
          return field.value;
        }
        if (field instanceof HTMLTextAreaElement) {
          return field.value;
        }
      });
      const newRestaurant: RestaurantType = {
        category: fieldValues[0] as CategoryType,
        name: fieldValues[1] as string,
        distance: Number(fieldValues[2]),
        introduction: fieldValues[3],
        link: fieldValues[4],
      };
      matzip.add(newRestaurant);
      $('.modal')?.classList.remove('modal--open');
      $('.restaurant-list-container')?.appendChild(new Restaurant(newRestaurant));
    });
  },

  openModal() {
    $('.gnb__button')?.addEventListener('click', () => {
      $('.modal')?.classList.add('modal--open');
    });
  },
};

export default matzipApp;
