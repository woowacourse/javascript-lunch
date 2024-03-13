import RestaurantList from '@/domain/RestaurantList';
import Component from './core/Component';
import { INITIAL_RESTAURANT_LIST } from '@/constants/config';
import dom from '@/utils/dom';

import Restaurant from '@/domain/Restaurant';
import { FILTERED_CATEGORY, FILTERED_CATEGORY_ATTRIBUTE, SORTING, SORTING_ATTRIBUTE } from '@/constants/filter';
import Dropdown from './Dropdown';
import RestaurantItem from './RestaurantItem';
import RestaurantForm from './RestaurantForm';

class App extends Component<unknown> {
  constructor($target: HTMLElement) {
    super($target, {});
  }

  render() {
    const $restaurantList = dom.getElement('.restaurant-list');
    const $form = dom.getElement('form');

    const restaurantList = this.getInitialRestaurantList();
    restaurantList.restaurants.forEach(restaurant => {
      new RestaurantItem({ $target: $restaurantList, information: restaurant.information });
    });

    this.createHomeSelect(restaurantList);
    new RestaurantForm({
      $target: $form,
      props: { restaurantList, handleCloseModal: this.handleCloseModal.bind(this) },
    });
  }

  setEvent() {
    dom.getElement('.gnb__button').addEventListener('click', this.handleOpenModal.bind(this));
    dom.getElement('.modal-backdrop').addEventListener('click', this.handleCloseModal.bind(this));
  }

  createCategorySelect($restaurantFilterContainer: HTMLElement, restaurantList: RestaurantList) {
    new Dropdown({
      $target: $restaurantFilterContainer,
      props: {
        kind: 'category',
        attributes: FILTERED_CATEGORY_ATTRIBUTE,
        options: FILTERED_CATEGORY,
        restaurantList,
      },
    });
  }

  createSortingSelect($restaurantFilterContainer: HTMLElement, restaurantList: RestaurantList) {
    new Dropdown({
      $target: $restaurantFilterContainer,
      props: {
        kind: 'sorting',
        attributes: SORTING_ATTRIBUTE,
        options: SORTING,
        restaurantList,
      },
    });
  }

  createHomeSelect(restaurantList: RestaurantList) {
    const $restaurantFilterContainer = dom.getElement('.restaurant-filter-container');
    this.createCategorySelect($restaurantFilterContainer, restaurantList);
    this.createSortingSelect($restaurantFilterContainer, restaurantList);
  }

  getInitialRestaurantList() {
    return new RestaurantList(INITIAL_RESTAURANT_LIST.map(restaurant => new Restaurant(restaurant)));
  }

  handleOpenModal() {
    dom.getElement('.modal').classList.add('modal--open');
  }

  handleCloseModal() {
    dom.getElement('.modal').classList.remove('modal--open');
    dom.getElement('#error-link').classList.add('hidden');
    const $form = dom.getElement('form') as HTMLFormElement;
    $form.reset();
  }
}

export default App;
