import RestaurantList from '@/domain/RestaurantList';
import Component from './core/Component';
import { INITIAL_RESTAURANT_LIST } from '@/constants/config';
import dom from '@/utils/dom';
import Restaurant from '@/domain/Restaurant';
import { FILTERED_CATEGORY, FILTERED_CATEGORY_ATTRIBUTE, SORTING, SORTING_ATTRIBUTE } from '@/constants/filter';
import Dropdown from './Dropdown';
import RestaurantForm from './RestaurantForm';
import RestaurantListContainer from './RestaurantListContainer';

class App extends Component<unknown> {
  constructor($target: HTMLElement) {
    super($target, {});
  }

  render() {
    const $form = dom.getElement('form');
    const $restaurantContainer = dom.getElement('.restaurant-list-container');
    const restaurantList = this.getInitialRestaurantList();

    new RestaurantForm({
      $target: $form,
      props: { restaurantList, handleCloseModal: this.handleCloseModal.bind(this) },
    });
    new RestaurantListContainer({
      $target: $restaurantContainer,
      props: { restaurantList, kind: 'all', createHomeDropdown: this.createHomeDropdown.bind(this) },
    });
  }

  setEvent() {
    dom.getElement('.gnb__button').addEventListener('click', this.handleOpenModal.bind(this));
    dom.getElement('.modal-backdrop').addEventListener('click', this.handleCloseModal.bind(this));

    const $allTab = dom.getElement('#all-tab');
    const $favoriteTab = dom.getElement('#favorite-tab');

    $favoriteTab.addEventListener('click', () => {
      $favoriteTab.classList.add('active-tab');
      $allTab.classList.remove('active-tab');
    });
    $allTab.addEventListener('click', () => {
      $allTab.classList.add('active-tab');
      $favoriteTab.classList.remove('active-tab');
    });
  }

  createCategoryDropdown($restaurantFilterContainer: HTMLElement, restaurantList: RestaurantList) {
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

  createSortingDropdown($restaurantFilterContainer: HTMLElement, restaurantList: RestaurantList) {
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

  createHomeDropdown(restaurantList: RestaurantList) {
    const $restaurantFilterContainer = dom.getElement('.restaurant-filter-container');
    this.createCategoryDropdown($restaurantFilterContainer, restaurantList);
    this.createSortingDropdown($restaurantFilterContainer, restaurantList);
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
