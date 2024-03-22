import RestaurantService from '../../service/RestaurantService';
import RestaurantList from '../root/RestaurantList/RestaurantList';
import { ILocation } from '../../interface/LocationInterface';
import { Category, Sort } from '../../constants/enums';
import { $, $$ } from '../../utils/domSelector';
import RestaurantInfoModal from '../modal/RestaurantInfoModal/RestaurantInfoModal';

class AppController {
  sort: Sort;
  category: Category | '전체';
  favorite: boolean;
  restaurantService: RestaurantService;

  constructor() {
    this.sort = Sort.이름순;
    this.category = '전체';
    this.favorite = false;
    this.restaurantService = new RestaurantService();
  }

  initializeApp() {
    const category = this.category === '전체' ? undefined : this.category;
    const restaurantList: RestaurantList = new RestaurantList(
      this.restaurantService.getRestaurants(this.sort, this.favorite, category),
    );

    const appElement = document.querySelector('#app');
    if (appElement) {
      appElement.appendChild(restaurantList);
      this.addEvent();
    }
  }

  addEvent() {
    const lunchHeader = $('lunch-header');
    if (lunchHeader) {
      lunchHeader.addEventListener('showAddRestaurantModal', this.showAddRestaurantModal.bind(this));
    }

    const addRestaurantModal = $('add-restaurant-modal');
    if (addRestaurantModal) {
      addRestaurantModal.addEventListener('submitAddingRestaurant', this.addRestaurant.bind(this));
    }

    const restaurantInfoModal = $('restaurant-info-modal');
    if (restaurantInfoModal) {
      restaurantInfoModal.addEventListener('toggleFavorite', this.toggleFavoriteInModal.bind(this));
      restaurantInfoModal.addEventListener('deleteRestaurantInfo', this.deleteRestaurantInfo.bind(this));
    }

    const selectBoxSection = $('select-box-section');
    if (selectBoxSection) {
      selectBoxSection.addEventListener('changeCategory', this.changeCategory.bind(this));
      selectBoxSection.addEventListener('changeSort', this.changeSort.bind(this));
    }

    const favoriteNavBar = $('favorite-tabnb');
    if (favoriteNavBar) {
      favoriteNavBar.addEventListener('showAll', this.showAll.bind(this));
      favoriteNavBar.addEventListener('showFavorite', this.showFavorite.bind(this));
    }

    const restaurantItems = $$('restaurant-item');
    if (restaurantItems) {
      restaurantItems.forEach((item) => {
        item.addEventListener('toggleFavorite', this.toggleFavorite.bind(this));
        item.addEventListener('showRestaurantInfoModal', (event: any) => {
          this.showRestaurantInfoModal(event.detail);
        });
      });
    }
  }

  showAll() {
    this.favorite = false;
    const showAllButton = $('#show-all');
    const showFavoriteButton = $('#show-favorite');
    if (showAllButton && !showAllButton.classList.contains('sel')) {
      showAllButton.classList.add('sel');
    }
    if (showFavoriteButton && showFavoriteButton.classList.contains('sel')) {
      showFavoriteButton.classList.remove('sel');
    }
    this.refreshRestaurantList();
  }

  showFavorite() {
    this.favorite = true;
    const showAllButton = $('#show-all');
    const showFavoriteButton = $('#show-favorite');
    if (showFavoriteButton && !showFavoriteButton.classList.contains('sel')) {
      showFavoriteButton.classList.add('sel');
    }
    if (showAllButton && showAllButton.classList.contains('sel')) {
      showAllButton.classList.remove('sel');
    }
    this.refreshRestaurantList();
  }

  changeCategory(event: Event) {
    const category: Category = (event as CustomEvent).detail;
    this.category = category;
    this.refreshRestaurantList();
  }

  changeSort(event: Event) {
    const sort: Sort = (event as CustomEvent).detail;
    this.sort = sort;
    this.refreshRestaurantList();
  }

  addRestaurant(event: Event) {
    const detail: ILocation = (event as CustomEvent).detail;
    this.restaurantService.addRestaurant(detail);
    this.refreshRestaurantList();
  }

  deleteRestaurantInfo(event: Event) {
    const detail: string = (event as CustomEvent).detail;
    this.restaurantService.deleteRestaurant(detail);
    this.refreshRestaurantList();
  }

  toggleFavorite(event: Event) {
    const detail: string = (event as CustomEvent).detail;
    this.restaurantService.toggleFavorite(detail);
    this.refreshRestaurantList();
  }

  toggleFavoriteInModal(event: Event) {
    const detail: string = (event as CustomEvent).detail;
    this.restaurantService.toggleFavoriteFromModal(detail);
  }

  refreshRestaurantList() {
    const category = this.category === '전체' ? undefined : this.category;
    const appElement = $('#app');
    const oldRestaurantList = $('restaurant-list');
    if (appElement && oldRestaurantList) {
      appElement.removeChild(oldRestaurantList);
      const restaurantList = new RestaurantList(
        this.restaurantService.getRestaurants(this.sort, this.favorite, category),
      );
      appElement.appendChild(restaurantList);
      this.addEventToRestaurantList(restaurantList);
    }
  }

  addEventToRestaurantList(restaurantList: RestaurantList) {
    const restaurantItems = restaurantList.querySelectorAll('restaurant-item');
    if (restaurantItems) {
      restaurantItems.forEach((item) => {
        const restaurantInfoModal = document.querySelector('restaurant-info-modal');
        item.addEventListener('toggleFavorite', this.toggleFavorite.bind(this));
        item.addEventListener('showRestaurantInfoModal', (event: any) => {
          this.showRestaurantInfoModal(event.detail);
        });
        if (restaurantInfoModal) {
          restaurantInfoModal.addEventListener('toggleFavorite', this.toggleFavorite.bind(this));
        }
      });
    }
  }

  showAddRestaurantModal() {
    const addRestaurantModal = $<HTMLDialogElement>('#add-restaurant-modal');
    if (addRestaurantModal) addRestaurantModal.showModal();
  }

  showRestaurantInfoModal(data: ILocation) {
    const restaurantInfoModal = document.querySelector('restaurant-info-modal');
    if (restaurantInfoModal instanceof RestaurantInfoModal) {
      const customEvent = new CustomEvent('restaurantDataUpdated', { detail: data });
      restaurantInfoModal.dispatchEvent(customEvent);

      const dialogElement = restaurantInfoModal?.querySelector('dialog');
      if (dialogElement instanceof HTMLDialogElement) {
        dialogElement.showModal();
      }
    }
  }
}

export default AppController;
