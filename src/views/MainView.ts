import { $, $$ } from '../utils/domSelectors';
import { Restaurant } from '../types/types';
import { FAVORITE_ICON_IMAGE, RESTAURANT_IMAGE } from '../constants/images';
import { RestaurantList } from '../components/RestaurantList';
import { RestaurantDetailModal } from '../components/RestaurantDetailModal';

class MainView {
  private addButton = $<HTMLButtonElement>('.gnb__button');
  private addRestaurantModal = $<HTMLDialogElement>('#add-restaurant-modal');
  private restaurantDetailModal = $<HTMLDialogElement>('#restaurant-detail-modal');
  private categoryFilter = $<HTMLSelectElement>('#category-filter');
  private sortingFilter = $<HTMLSelectElement>('#sorting-filter');

  constructor() {
    this.addRestaurantAddButtonClickEvent();
    this.addRestaurantDetailModalBackdropClickEvent();
  }

  addRestaurantAddButtonClickEvent() {
    this.addButton.addEventListener('click', () => {
      this.addRestaurantModal.showModal();
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
    this.addEventHandlersAfterRenderRestaurant();
  }

  addFavoriteButtonClickEventHandler() {
    const favoriteButtons = $$('.favorite-button');

    favoriteButtons.forEach((favoriteButton) => {
      favoriteButton.addEventListener('click', (event) => {
        if (event.target instanceof HTMLButtonElement) {
          const currentImage = event.target.style.backgroundImage;
          const toggledImageUrl = this.toggleButtonBackgroundImageUrl(currentImage);

          event.target.style.backgroundImage = `url("${toggledImageUrl}")`;

          const name = event.target.parentNode?.querySelector('.restaurant__name')?.textContent;
          const restaurant = JSON.parse(localStorage.getItem(name ?? '') ?? '{}');

          restaurant.favoriteImageUrl = toggledImageUrl;
          localStorage.setItem(restaurant.name, JSON.stringify(restaurant));
        }
      });
    });
  }

  toggleButtonBackgroundImageUrl(currentImage: string) {
    const linedImage = `url("${FAVORITE_ICON_IMAGE.LINED}")`;

    if (currentImage === linedImage) return FAVORITE_ICON_IMAGE.FILLED;
    return FAVORITE_ICON_IMAGE.LINED;
  }

  addRestaurantListClickEventHandler() {
    const restaurantList = $$('.restaurant');

    restaurantList.forEach((restaurantItem) => {
      restaurantItem.addEventListener('click', (event) => {
        if (!(event.currentTarget instanceof HTMLLIElement)) return false;
        if (event.target instanceof HTMLButtonElement) return false;

        const name = event.currentTarget.querySelector('.restaurant__name')?.textContent;
        const restaurant = JSON.parse(localStorage.getItem(name ?? '') ?? '{}');

        this.renderRestaurantDetailModal(restaurant);
        this.restaurantDetailModal.showModal();
      });
    });
  }

  renderRestaurantDetailModal(restaurant: Restaurant) {
    const categoryImageUrl = RESTAURANT_IMAGE[restaurant.category];
    const restaurantDetailModalTemplate = RestaurantDetailModal(restaurant, categoryImageUrl);

    this.restaurantDetailModal.innerHTML = '';
    this.restaurantDetailModal.insertAdjacentHTML('beforeend', restaurantDetailModalTemplate);
  }

  addRestaurantDetailModalBackdropClickEvent() {
    this.restaurantDetailModal.addEventListener('click', (event) => {
      if (event.target instanceof HTMLDialogElement && event.target.nodeName === 'DIALOG') {
        event.target.close();
      }
    });
  }

  addEventHandlersAfterRenderRestaurant() {
    this.addFavoriteButtonClickEventHandler();
    this.addRestaurantListClickEventHandler();
  }
}

export default MainView;
