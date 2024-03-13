import RestaurantList from '@/domain/RestaurantList';
import Component from './core/Component';
import { INITIAL_RESTAURANT_LIST } from '@/constants/config';
import dom from '@/utils/dom';
import Restaurant from '@/domain/Restaurant';
import { FILTERED_CATEGORY, FILTERED_CATEGORY_ATTRIBUTE, SORTING, SORTING_ATTRIBUTE } from '@/constants/filter';
import Dropdown from './Dropdown';
import RestaurantForm from './RestaurantForm';
import RestaurantListContainer from './RestaurantListContainer';
import TabMenu from './TabMenu';

class App extends Component<unknown> {
  constructor($target: HTMLElement) {
    super($target, {});
  }

  render() {
    const $form = dom.getElement('form');
    const $restaurantContainer = dom.getElement('.restaurant-list-container');
    const $allTab = dom.getElement('#all-tab');
    const $favoriteTab = dom.getElement('#favorite-tab');
    const restaurantList = this.getInitialRestaurantList();

    this.renderTabMenus($allTab, $favoriteTab);
    new RestaurantListContainer({
      $target: $restaurantContainer,
      props: { restaurantList, kind: 'all', renderHomeDropdown: this.renderHomeDropdown.bind(this) },
    });
    new RestaurantForm({
      $target: $form,
      props: { restaurantList, handleCloseModal: this.handleCloseModal.bind(this) },
    });
  }

  setEvent() {
    dom.getElement('.gnb__button').addEventListener('click', this.handleOpenModal.bind(this));
    dom.getElement('.modal-backdrop').addEventListener('click', this.handleCloseModal.bind(this));
  }

  renderTabMenus($allTab: HTMLElement, $favoriteTab: HTMLElement) {
    new TabMenu({
      $target: $allTab,
      props: {
        clickEvent: () => {
          this.handleClickAllTab($allTab, $favoriteTab);
        },
      },
    });
    new TabMenu({
      $target: $favoriteTab,
      props: {
        clickEvent: () => {
          this.handleClickFavoriteTab($allTab, $favoriteTab);
        },
      },
    });
  }

  handleClickAllTab($allTab: HTMLElement, $favoriteTab: HTMLElement) {
    $allTab.classList.add('active-tab');
    $favoriteTab.classList.remove('active-tab');
  }

  handleClickFavoriteTab($allTab: HTMLElement, $favoriteTab: HTMLElement) {
    $favoriteTab.classList.add('active-tab');
    $allTab.classList.remove('active-tab');
  }

  renderCategoryDropdown($restaurantFilterContainer: HTMLElement, restaurantList: RestaurantList) {
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

  renderSortingDropdown($restaurantFilterContainer: HTMLElement, restaurantList: RestaurantList) {
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

  renderHomeDropdown(restaurantList: RestaurantList) {
    const $restaurantFilterContainer = dom.getElement('.restaurant-filter-container');
    this.renderCategoryDropdown($restaurantFilterContainer, restaurantList);
    this.renderSortingDropdown($restaurantFilterContainer, restaurantList);
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
