import Matzip from './matzip';
import matzipList from './mock/restaurants';
import DOM from './utils/DOM';
import { FilterChangeEvent } from './components/FilterContainer';
import Restaurant from './components/Restaurant';
import { CategoryType, SortType } from './types';

const { $, $$ } = DOM;

const matzipApp = {
  init() {
    const matzip = new Matzip(matzipList);
    this.initList(matzip);
    this.openModal();
    this.listenCategoryChange(matzip);
  },

  initList(matzip: Matzip) {
    document.addEventListener('DOMContentLoaded', () => {
      matzip.getRestaurants().forEach((restaurant) => {
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

  openModal() {
    $('.gnb__button')?.addEventListener('click', () => {
      $('.modal')?.classList.add('modal--open');
    });
  },
};

export default matzipApp;
