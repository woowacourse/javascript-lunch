import Matzip from './matzip';
import matzipList from './mock/restaurants';
import DOM from './utils/DOM';
import { CategoryChangeEvent } from './components/FilterContainer';

const { $, $$ } = DOM;

const matzipApp = {
  init() {
    const matzip = new Matzip(matzipList);
    this.openModal();
    this.listenCategoryChange(matzip);
  },

  listenCategoryChange(matzip: Matzip) {
    document.addEventListener('categoryChange', (event: Event) => {
      const customEvent = event as CategoryChangeEvent;
      const selectedCategory = customEvent.detail.selectedCategory;
      console.log(matzip.filterByCategory(selectedCategory));
    });
  }

  openModal() {
    $('.gnb__button')?.addEventListener('click', () => {
      $('.modal')?.classList.add('modal--open');
    });
  },
};

export default matzipApp;
