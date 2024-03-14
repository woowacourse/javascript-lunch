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
import type { TTabMenu } from '@/types/restaurant';

class App extends Component<unknown> {
  constructor($target: HTMLElement) {
    super($target, {});
  }

  render() {
    const $form = dom.getElement('form');
    const $allTab = dom.getElement('#all-tab');
    const $favoriteTab = dom.getElement('#favorite-tab');
    const restaurantList = this.getInitialRestaurantList();

    this.renderTabMenus($allTab, $favoriteTab, restaurantList);
    this.renderHomeDropdown(restaurantList);
    this.renderRestaurantList(restaurantList, 'all');
    new RestaurantForm({
      $target: $form,
      props: { restaurantList, handleCloseModal: this.handleCloseModal.bind(this) },
    });
  }

  setEvent() {
    dom.getElement('.gnb__button').addEventListener('click', this.handleOpenModal.bind(this));
    dom.getElement('.modal-backdrop').addEventListener('click', this.handleCloseModal.bind(this));
  }

  renderRestaurantList(restaurantList: RestaurantList, kind: TTabMenu) {
    const $restaurantContainer = dom.getElement('.restaurant-list-container');
    new RestaurantListContainer({
      $target: $restaurantContainer,
      props: { restaurantList, kind },
    });
  }

  renderTabMenus($allTab: HTMLElement, $favoriteTab: HTMLElement, restaurantList: RestaurantList) {
    new TabMenu({
      $target: $allTab,
      props: {
        clickEvent: () => {
          this.handleClickAllTab($allTab, $favoriteTab, restaurantList);
        },
      },
    });
    new TabMenu({
      $target: $favoriteTab,
      props: {
        clickEvent: () => {
          this.handleClickFavoriteTab($allTab, $favoriteTab, restaurantList);
        },
      },
    });
  }

  handleClickAllTab($allTab: HTMLElement, $favoriteTab: HTMLElement, restaurantList: RestaurantList) {
    $allTab.classList.add('active-tab');
    $favoriteTab.classList.remove('active-tab');
    this.renderRestaurantList(restaurantList, 'all');
  }

  handleClickFavoriteTab($allTab: HTMLElement, $favoriteTab: HTMLElement, restaurantList: RestaurantList) {
    $favoriteTab.classList.add('active-tab');
    $allTab.classList.remove('active-tab');
    this.renderRestaurantList(restaurantList, 'favorite');
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
    $restaurantFilterContainer.replaceChildren();
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
