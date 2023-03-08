import { $, $$ } from './utils/dom';

import CreateRestaurantModal from './components/CreateRestaurantModal';
import Header from './components/Header';
import RestaurantFilterContainer from './components/RestaurantFilterContainer';
import RestaurantItems from './components/RestaurantItems';

import Restaurants from './domain/Restaurants';
import Validator from './domain/Validator';

import store from './utils/store';
import UpperTap from './components/UpperTap';

export default class App {
  restaurants;

  constructor() {
    const restaurantsData = store.getLocalStorage();
    this.restaurants = new Restaurants(restaurantsData);

    new Header(this.onClickModalOpenButton.bind(this));
    new UpperTap(this.onClickNavTap.bind(this));
    new RestaurantFilterContainer(this.renderFilteredItems.bind(this));
    this.renderFilteredItems();
    new CreateRestaurantModal(this.onSubmitAddRestaurantForm.bind(this), this.toggle);
  }

  onClickModalOpenButton() {
    $('.add-restaurant-form').reset();
    this.toggleModal();
  }

  onClickNavTap(e) {
    const navElements = $$('.upper-tap > div');
    const clickedElement = e.target;
    navElements.forEach((navElement) => {
      if (navElement !== clickedElement) {
        navElement.classList.remove('selected');
      }
    });
    clickedElement.classList.add('selected');
  }

  renderFilteredItems() {
    const categoryOption = $('#category-filter').value;
    const sortOption = $('#sorting-filter').value;

    const filteredRestaurants = this.restaurants.getFilteredRestaurantsByCategory(categoryOption);

    const sortedRestaurants = this.restaurants.getSortedRestaurants(
      filteredRestaurants,
      sortOption
    );

    new RestaurantItems(sortedRestaurants);
  }

  onSubmitAddRestaurantForm(e) {
    e.preventDefault();

    const {
      category: { value: category },
      name: { value: name },
      distance: { value: distance },
      description: { value: description },
      link: { value: link },
    } = e.target.elements;

    try {
      Validator.validateFormData({ category, name, distance });
    } catch ({ message }) {
      return alert(message);
    }

    const restaurant = {
      category,
      name,
      distance,
      description,
      link,
    };

    this.restaurants.addRestaurant(restaurant);
    store.setLocalStorage(this.restaurants.getRestaurants());

    this.toggleModal();

    const curCategoryOption = $('#category-filter').value;
    if (curCategoryOption !== '전체' && category !== curCategoryOption) return;

    this.renderFilteredItems();
  }

  toggleModal() {
    $('.modal').classList.toggle('modal--open');
  }
}
