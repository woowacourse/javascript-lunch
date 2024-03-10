import Matzip from './matzip';
import storage from './storage';
import { CategoryType, SortType, Restaurant as RestaurantType } from './types';
import Condition from './constants/Condition';

import DOM from './utils/DOM';
import { FilterChangeEvent } from './components/FilterContainer';
import Restaurant from './components/Restaurant';
import ListContainer from './components/ListContainer';
import { Select } from './components/tag/select';
import { TextArea } from './components/tag/textarea';
import { Input } from './components/tag/input';

const { $, $$, insertElementsInTarget } = DOM;
const { CATEGORY } = Condition;

const root = {
  init() {
    const matzip = new Matzip(storage.getData());
    this.initList(matzip);
    this.listenCategoryChange(matzip);
    this.listenRestaurantAdd(matzip);
  },

  initList(matzip: Matzip) {
    document.addEventListener('DOMContentLoaded', () => {
      const initSort = $<HTMLSelectElement>('#sorting-filter');
      const sortBy = initSort.options[initSort.selectedIndex].value;
      const listContainer = new ListContainer();
      const restaurantElements: Restaurant[] = matzip.filterAndSort(CATEGORY.whole, sortBy as SortType).map((restaurant) => new Restaurant(restaurant));

      insertElementsInTarget(listContainer, restaurantElements);
      $<HTMLElement>('main').appendChild(listContainer);
    });
  },

  listenCategoryChange(matzip: Matzip) {
    document.addEventListener('filterChange', (event: Event) => {
      $<ListContainer>('.restaurant-lists').remove();

      const customEvent = event as FilterChangeEvent;
      const selectedCategory = customEvent.detail.selectedCategory;
      const selectedSort = customEvent.detail.selectedSort;
      const restaurantElements: Restaurant[] = matzip.filterAndSort(
        selectedCategory as CategoryType,
        selectedSort as SortType,
      ).map((restaurant) => new Restaurant(restaurant));

      const listContainer = new ListContainer();      
      insertElementsInTarget(listContainer, restaurantElements);
      $<HTMLElement>('main').appendChild(listContainer);
    });
  },

  listenRestaurantAdd(matzip: Matzip) {
    $<HTMLElement>('#restaurant-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const fieldValues = Array.from($$('.form-item')).map((item) => {
        const field = item.children[1] as Select | TextArea | Input;
        return field.getValue();
      });
      const newRestaurant: RestaurantType = {
        category: fieldValues[0] as CategoryType,
        name: fieldValues[1] as string,
        distance: Number(fieldValues[2]),
        introduction: fieldValues[3],
        link: fieldValues[4],
      };

      matzip.add(newRestaurant);
      storage.addData(newRestaurant);
      $<HTMLElement>('.modal').classList.remove('modal--open');
      $<HTMLUListElement>('.restaurant-lists').appendChild(new Restaurant(newRestaurant));
    });
  },
};

export default root;
