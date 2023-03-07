import { Restaurant } from '../model/RestaurantList';
import RestaurantList from '../model/RestaurantList';
import { $, $$$ } from '../../utils';
import { DEFAULT_RESTAURANTS, LOCAL_STORAGE_KEY } from '../../constants';

class LunchRecommendation {
  #restaurants = new RestaurantList();

  constructor() {
    this.setRestaurantData();
    this.drawRestaurants();
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
        $('add-restaurant-modal').closeModal();
        this.drawRestaurants();
      }
    );
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

  filterEvent() {
    $$$('#categoryFilter', '#categoryFilter').addEventListener('change', () => {
      this.drawRestaurants();
    });
  }

  play() {
    this.addRestaurantEvent();
    this.filterEvent();
    this.sortEvent();
  }

  setRestaurantData() {
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

  sortEvent() {
    $$$('#sortingFilter', '#sortingFilter').addEventListener('change', () => {
      this.drawRestaurants();
    });
  }
}

export default LunchRecommendation;
