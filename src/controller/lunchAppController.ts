import { LunchHeaderComponent } from '../components/LunchHeaderComponent';
import { ModalComponent } from '../components/ModalComponent';
import SortFilterComponent from '../components/SortFilterComponent';
import CategoryFilterComponent from '../components/CategoryFilterComponent';
import { CATEGORY, SORTING } from '../constants/constants';
import RestaurantList from '../domain/restaurantList';

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
    this.renderModal();
    this.renderCategoryFilter();
    this.renderSortingFilter();
  }

  private renderGNB = () => {
    const lunchHeader = LunchHeaderComponent();
    this.$appContainer.prepend(lunchHeader.getTemplate());
  };

  private renderCategoryFilter = () => {
    const categoryFilter = new CategoryFilterComponent();
    const node = categoryFilter.getTemplate(CATEGORY);
    categoryFilter.setEvent(node, this.restaurantList);
    this.$filterContainer.appendChild(node);
  };

  private renderSortingFilter = () => {
    const sortingFilter = new SortFilterComponent();
    const node = sortingFilter.getTemplate(SORTING);

    sortingFilter.setEvent(node, this.restaurantList);
    this.$filterContainer.appendChild(node);
  };

  private renderModal = () => {
    const modal = ModalComponent();

    this.$appContainer.appendChild(modal.getTemplate());
    modal.setEvent();
  };
}

const lunchAppController = new LunchAppController();
await lunchAppController.init();