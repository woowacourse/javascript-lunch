import Restaurant from '../model/Restaurant';
import RestaurantList from '../model/RestaurantList';
import { $$$ } from '../../utils';
import webView from '../../view/webView';

class LunchRecommendation {
  #restaurants = new RestaurantList();

  constructor() {
    const userList = JSON.parse(localStorage.getItem('userList'));
    console.log(userList);

    if (userList) {
      userList.forEach((restaurant) => {
        const objectToClass = new Restaurant(restaurant);
        this.#restaurants.add(objectToClass);
      });
    }

    webView.renderRestaurantList(this.#restaurants.getList('전체', 'name'));
  }

  play() {
    this.modalEvent();
    this.addRestaurantEvent();
    this.filterEvent();
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
      (event) => {
        event.preventDefault();

        const category = $$$('add-restaurant-modal', '#categoryList').value;
        const name = $$$('add-restaurant-modal', '#nameInput').value;
        const distance = $$$('add-restaurant-modal', '#distanceList').value;
        const description = $$$(
          'add-restaurant-modal',
          '#descriptionInput'
        ).value;
        const link = $$$('add-restaurant-modal', '#linkInput').value;
        const restaurant = new Restaurant({
          category,
          name,
          distance,
          description,
          link,
        });
        this.#restaurants.add(restaurant);
        const restaurants = this.#restaurants.getList('전체', 'name');

        const classToObject = restaurants.reduce(
          (accumulator, currentRestaurant) => {
            return [...accumulator, currentRestaurant.getInfo()];
          },
          []
        );

        const restaurantsString = JSON.stringify(classToObject);
        window.localStorage.setItem('userList', restaurantsString);
        webView.toggleModal();
        webView.resetForm();
        webView.renderRestaurantList(restaurants);
      }
    );
  }

  filterEvent() {
    $$$('#categoryFilter', '#categoryFilterSelect').addEventListener(
      'change',
      () => {
        const categoryValue = $$$(
          '#categoryFilter',
          '#categoryFilterSelect'
        ).value;

        const sortingValue = $$$(
          '#sortingFilter',
          '#sortingFilterSelect'
        ).value;

        const filteredList = this.#restaurants.getList(
          categoryValue,
          sortingValue
        );
        webView.renderRestaurantList(filteredList);
      }
    );
  }
}

export default LunchRecommendation;
