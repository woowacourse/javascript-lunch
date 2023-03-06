import { Restaurant } from '../model/RestaurantList';
import RestaurantList from '../model/RestaurantList';
import { $, $$$ } from '../../utils';
import { DEFAULT_RESTAURANTS, LOCAL_STORAGE_KEY } from '../../constants';

class LunchRecommendation {
  #restaurants = new RestaurantList();

  constructor() {
    this.isFirstGuest();
    this.drawRestaurants();
  }

  isFirstGuest() {
    const userList: Restaurant[] = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
    );

    if (userList.length > 0) {
      userList.forEach((restaurant) => {
        this.#restaurants.add(restaurant);
      });
      return;
    }

    DEFAULT_RESTAURANTS.forEach((restaurant) => {
      this.#restaurants.add(restaurant);
    });
  }

  play() {
    this.modalEvent();
    this.addRestaurantEvent();
    this.filterEvent();
    this.sortEvent();
  }

  modalEvent() {
    $$$('lunch-header', '#openModal').addEventListener('click', () => {
      $('add-restaurant-modal').modalOpen(true);
    });
    $$$('add-restaurant-modal', '#cancleModal').addEventListener(
      'click',
      () => {
        $('add-restaurant-modal').modalOpen(false);
      }
    );

    $$$('add-restaurant-modal', '#modalBackdrop').addEventListener(
      'click',
      () => {
        $('add-restaurant-modal').modalOpen(false);
        // $('add-restaurant-modal').setAttribute('modal', 'close');
      }
    );

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        $('add-restaurant-modal').modalOpen(false);
      }
    });
  }

  addRestaurantEvent() {
    $$$('add-restaurant-modal', '#addRestraunt').addEventListener(
      'click',
      (event: SubmitEvent) => {
        event.preventDefault();

        const { category, name, distance, description, link } = $(
          'add-restaurant-modal'
        ).getFormValues();

        if ($('add-restaurant-modal').isError()) {
          return;
        }

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
        $('add-restaurant-modal').resetForm();
        $('add-restaurant-modal').modalOpen(false);
        this.drawRestaurants();
      }
    );
  }

  filterEvent() {
    $$$('#categoryFilter', '#categoryFilter').addEventListener('change', () => {
      this.drawRestaurants();
    });
  }

  sortEvent() {
    $$$('#sortingFilter', '#sortingFilter').addEventListener('change', () => {
      this.drawRestaurants();
    });
  }

  drawRestaurants() {
    const categoryValue = $('#categoryFilter').getSelectValue();
    const sortingValue = $('#sortingFilter').getSelectValue();

    const englishSortingValue = sortingValue === '이름순' ? 'name' : 'distance';

    const filteredList = this.#restaurants.getList(
      categoryValue,
      englishSortingValue
    );

    $('restaurant-boxes').restaurantListRender(filteredList);
  }
}

export default LunchRecommendation;
