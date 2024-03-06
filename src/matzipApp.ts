import Matzip from './matzip';
import matzipList from './mock/restaurants';
import DOM from './utils/DOM';
import { CategoryChangeEvent } from './components/FilterContainer';
import Restaurant from './components/Restaurant';
import { CategoryType } from './types';

const { $, $$ } = DOM;

const matzipApp = {
  init() {
    const matzip = new Matzip(matzipList);
    this.openModal();
    this.listenCategoryChange(matzip);
  },

  listenCategoryChange(matzip: Matzip) {
    document.addEventListener('categoryChange', (event: Event) => {
      Array.from($$('.restaurant')).map((node) => node.remove());

      const customEvent = event as CategoryChangeEvent;
      const selectedCategory = customEvent.detail.selectedCategory;
      const restaurants = matzip.filterByCategory(selectedCategory as CategoryType);
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
