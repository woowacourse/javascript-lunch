import { $, $$ } from '../utils/domSelectors';
import { Restaurant } from '../types/types';
import { RestaurantList } from '../components/RestaurantList';
import { FAVORITE_ICON_IMAGE } from '../constants/images';

class MainView {
  private addButton = $<HTMLButtonElement>('.gnb__button');
  private modal = $<HTMLDialogElement>('.modal');
  private categoryFilter = $<HTMLSelectElement>('#category-filter');
  private sortingFilter = $<HTMLSelectElement>('#sorting-filter');

  constructor() {
    this.addRestaurantAddButtonClickEvent();
  }

  addRestaurantAddButtonClickEvent() {
    this.addButton.addEventListener('click', () => {
      this.modal.showModal();
    });
  }

  addCategoryChangeEventHandler(onChangeCategoryFilter: CallableFunction) {
    this.categoryFilter.addEventListener('change', (event: Event) => {
      if (event.target instanceof HTMLSelectElement) onChangeCategoryFilter(event.target.value);
    });
  }

  addSortingChangeEventHandler(onChangeSortingFilter: CallableFunction) {
    this.sortingFilter.addEventListener('change', (event: Event) => {
      if (event.target instanceof HTMLSelectElement) onChangeSortingFilter(event.target.value);
    });
  }

  renderRestaurantList(restaurants: Restaurant[]) {
    const restaurantListContainer = $<HTMLTableSectionElement>('.restaurant-list-container');
    const restaurantItems = RestaurantList(restaurants);

    restaurantListContainer.innerHTML = '';
    restaurantListContainer.insertAdjacentHTML('beforeend', restaurantItems);
  }

  addFavoriteButtonClickEventHandler() {
    const favoriteButtons = $$('.favorite-button');

    favoriteButtons.forEach((favoriteButton) => {
      favoriteButton.addEventListener('click', (event) => {
        if (event.target instanceof HTMLButtonElement) {
          const currentUrl = event.target.style.backgroundImage;

          event.target.style.backgroundImage = this.getButtonBackgroundImage(currentUrl);
        }
      });
    });
  }

  getButtonBackgroundImage(currentUrl: string) {
    const filledImageUrl = `url("${FAVORITE_ICON_IMAGE.FILLED}")`;
    const linedImageUrl = `url("${FAVORITE_ICON_IMAGE.LINED}")`;

    if (currentUrl === linedImageUrl) return filledImageUrl;
    return linedImageUrl;
  }
}

export default MainView;
