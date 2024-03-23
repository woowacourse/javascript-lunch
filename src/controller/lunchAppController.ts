import { AddModal, CategoryFilter, Header, SortFilter, TabBar } from '../components';
import RestaurantList, { restaurantList } from '../domain/restaurantList';

export default class LunchAppController {
  private $appContainer: HTMLElement;
  private $filterContainer: HTMLElement;
  private restaurantList = restaurantList;

  constructor() {
    this.$appContainer = document.querySelector('body') as HTMLElement;
    this.$filterContainer = document.querySelector('.restaurant-filter-container') as HTMLElement;
  }

  async init() {
    this.renderGNB();
    this.renderTabBar();
    this.renderModal();
    this.renderCategoryFilter();
    this.renderSortingFilter();
  }

  private renderGNB = () => {
    const lunchHeader = Header();
    this.$appContainer.prepend(lunchHeader.create());
  };

  private renderTabBar = () => {
    const tabBar = TabBar(this.restaurantList).create();

    const headerElement = this.$appContainer.querySelector('.gnb');

    if (headerElement) {
      headerElement.parentNode?.insertBefore(tabBar, headerElement.nextSibling);
    }
  };

  private renderCategoryFilter = () => {
    const categoryFilter = CategoryFilter(this.restaurantList).create();
    this.$filterContainer.appendChild(categoryFilter);
  };

  private renderSortingFilter = () => {
    const categoryFilter = SortFilter(this.restaurantList).create();
    this.$filterContainer.appendChild(categoryFilter);
  };

  private renderModal = () => {
    const addModal = AddModal().create();
    this.$appContainer.appendChild(addModal);
  };
}

const lunchAppController = new LunchAppController();
lunchAppController.init();
