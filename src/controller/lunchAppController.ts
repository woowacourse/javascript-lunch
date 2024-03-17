import { LunchHeaderComponent } from '../components/LunchHeaderComponent';
import SortFilterComponent from '../components/SortFilterComponent';
import CategoryFilterComponent from '../components/CategoryFilterComponent';
import { CATEGORY, SORTING } from '../constants';
import RestaurantList from '../domain/restaurantList';
import TabBarComponent from '../components/TabBarComponents';
import AddModalComponent from '../components/AddModalComponent';

export default class LunchAppController {
  private $appContainer: HTMLElement;
  private $filterContainer: HTMLElement;
  private restaurantList = new RestaurantList();

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
    const lunchHeader = LunchHeaderComponent();
    this.$appContainer.prepend(lunchHeader.create());
  };

  private renderTabBar = () => {
    const tabBar = TabBarComponent(this.restaurantList).create();

    const headerElement = this.$appContainer.querySelector('.gnb');

    if (headerElement) {
      headerElement.parentNode?.insertBefore(tabBar, headerElement.nextSibling);
    }
  };

  private renderCategoryFilter = () => {
    const categoryFilter = CategoryFilterComponent(this.restaurantList).create();
    this.$filterContainer.appendChild(categoryFilter);
  };

  private renderSortingFilter = () => {
    const categoryFilter = SortFilterComponent(this.restaurantList).create();
    this.$filterContainer.appendChild(categoryFilter);
  };

  private renderModal = () => {
    const addModal = AddModalComponent().create();
    this.$appContainer.appendChild(addModal);
  };
}

const lunchAppController = new LunchAppController();
await lunchAppController.init();
