import RestaurantList, { Restaurant } from '../model/RestaurantList';
import { $$$ } from '../../utils';
import webView from '../../view/webView';
import { DEFAULT_RESTAURANTS, LOCAL_STORAGE_KEY } from '../../constants';

class LunchRecommendation {
  #restaurants = new RestaurantList();

  constructor() {
    DEFAULT_RESTAURANTS.forEach((restaurant) => {
      this.#restaurants.add(restaurant);
    });

    const userList: Restaurant[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
    );

    if (userList) {
      userList.forEach((restaurant) => {
        this.#restaurants.add(restaurant);
      });
    }

    webView.renderRestaurantList(this.#restaurants.getList('전체', 'name'));
  }

  play() {
    this.modalEvent();
    this.addRestaurantEvent();
    this.filterEvent();
    this.sortEvent();
  }

  modalEvent() {
    $$$('lunch-header', '#openModal').addEventListener(
      'click',
      webView.toggleModal
    );

    $$$('add-restaurant-modal', '#cancleModal').addEventListener(
      'click',
      webView.toggleModal
    );

    $$$('add-restaurant-modal', '#modalBackdrop').addEventListener(
      'click',
      webView.toggleModal
    );

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        webView.toggleModal();
      }
    });
  }

  addRestaurantEvent() {
    $$$('add-restaurant-modal', '#addRestraunt').addEventListener(
      'click',
      (event: SubmitEvent) => {
        event.preventDefault();

        const category = $$$('add-restaurant-modal', '#categoryList').value;
        const name = $$$('add-restaurant-modal', '#nameInput').value;
        const distance = $$$('add-restaurant-modal', '#distanceList').value;
        const description = $$$(
          'add-restaurant-modal',
          '#descriptionInput'
        ).value;
        const link = $$$('add-restaurant-modal', '#linkInput').value;
        const restaurant = {
          category,
          name,
          distance,
          description,
          link,
        };
        this.#restaurants.add(restaurant);
        const restaurants = this.#restaurants.getList('전체', 'name');

        const restaurantsString = JSON.stringify(restaurants);
        window.localStorage.setItem(LOCAL_STORAGE_KEY, restaurantsString);
        webView.toggleModal();
        webView.resetForm();
        webView.renderRestaurantList(restaurants);
      }
    );
  }

  filterEvent() {
    $$$('#sortingFilter', '#sortingFilterSelect').addEventListener(
      'change',
      () => {
        this.drawRestuants();
      }
    );
  }

  sortEvent() {
    $$$('#categoryFilter', '#categoryFilterSelect').addEventListener(
      'change',
      () => {
        this.drawRestuants();
      }
    );
  }

  drawRestuants() {
    const categoryValue = $$$('#categoryFilter', '#categoryFilterSelect').value;

    const sortingValue = $$$('#sortingFilter', '#sortingFilterSelect').value;

    const englishSortingValue = sortingValue === '이름순' ? 'name' : 'distance';

    const filteredList = this.#restaurants.getList(
      categoryValue,
      englishSortingValue
    );

    webView.renderRestaurantList(filteredList);
  }
}

export default LunchRecommendation;
