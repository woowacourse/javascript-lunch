import { Restaurant } from '../model/RestaurantList';
import RestaurantList from '../model/RestaurantList';
import { $, $$$ } from '../../utils';
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

    this.drawRestaurants();
  }

  play() {
    this.modalEvent();
    this.addRestaurantEvent();
    this.filterEvent();
    this.sortEvent();
  }

  modalEvent() {
    $$$('lunch-header', '#openModal').addEventListener('click', () => {
      this.modalOpen(true);
    });
    $$$('add-restaurant-modal', '#cancleModal').addEventListener(
      'click',
      () => {
        this.modalOpen(false);
      }
    );

    $$$('add-restaurant-modal', '#modalBackdrop').addEventListener(
      'click',
      () => {
        this.modalOpen(false);
        // $('add-restaurant-modal').setAttribute('modal', 'close');
      }
    );

    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.modalOpen(false);
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

        const restaurant = {
          category: category,
          name: name,
          distance: distance,
          description: description,
          link: link,
        };
        this.#restaurants.add(restaurant);
        const restaurants = this.#restaurants.getList('전체', 'name');

        const restaurantsString = JSON.stringify(restaurants);
        window.localStorage.setItem(LOCAL_STORAGE_KEY, restaurantsString);
        $('add-restaurant-modal').resetForm();
        this.modalOpen(false);
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

  modalOpen(isOpen: boolean) {
    $('add-restaurant-modal').modalOpen(isOpen);
  }
}

export default LunchRecommendation;
