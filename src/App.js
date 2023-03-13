import { $, $$ } from './utils/dom';
import store from './utils/store';

import CreateRestaurantModal from './components/CreateRestaurantModal';
import Header from './components/Header';
import RestaurantFilterContainer from './components/RestaurantFilterContainer';
import RestaurantItems from './components/RestaurantItems';
import UpperTab from './components/UpperTab';
import RestaurantDetailModal from './components/RestaurantDetailModal';

import Restaurants from './domain/Restaurants';
import Validator from './domain/Validator';

export default class App {
  restaurants;
  state;

  constructor() {
    this.state = {
      filterCategory: '전체',
      sortOption: 'name',
      navTab: '모든 음식점',
    };

    const restaurantsData = store.getLocalStorage('lunch_app_restaurants');
    this.restaurants = new Restaurants(restaurantsData);

    new Header(this.onClickAddRestaurantButton.bind(this));
    new UpperTab(this.onClickNavTab.bind(this));
    new RestaurantFilterContainer(this.setState.bind(this));
    this.renderFilteredItems(this.state.filterCategory, this.state.sortOption);
    new CreateRestaurantModal(
      this.onSubmitAddRestaurantForm.bind(this),
      this.toggleAddRestaurantModal
    );
  }

  onClickAddRestaurantButton() {
    $('.add-restaurant-form').reset();
    this.toggleAddRestaurantModal();
  }

  onClickNavTab(e) {
    const navElements = $$('.nav-button');
    const clickedElement = e.target;

    navElements.forEach((navElement) => {
      if (navElement !== clickedElement) navElement.classList.remove('selected');
    });
    clickedElement.classList.add('selected');

    this.setState({ navTab: clickedElement.innerText });
  }

  renderLikedItems() {
    const likedRestaurants = this.restaurants.getLikedRestaurants();

    new RestaurantItems(likedRestaurants, this.onClickRestaurant.bind(this));
  }

  setState(obj) {
    this.state = { ...this.state, ...obj };

    if (this.state.navTab === '자주 가는 음식점') {
      $('.restaurant-filter-container').classList.add('hidden');
      return this.renderLikedItems();
    }

    $('.restaurant-filter-container').classList.remove('hidden');
    this.renderFilteredItems(this.state.filterCategory, this.state.sortOption);
  }

  renderFilteredItems(filterCategory, sortOption) {
    const filteredRestaurants = this.restaurants.getFilteredRestaurantsByCategory(filterCategory);

    const sortedRestaurants = this.restaurants.getSortedRestaurants(
      filteredRestaurants,
      sortOption
    );

    new RestaurantItems(sortedRestaurants, this.onClickRestaurant.bind(this));
  }

  onClickRestaurant(e) {
    const restaurantId = e.target.closest('li').id;
    const restaurants = this.restaurants.getRestaurants();
    const restaurantIndex = restaurants.findIndex((restaurant) => {
      return restaurant.id === restaurantId;
    });

    if ([...e.target.classList].includes('favorite-icon')) {
      return this.onClickStarIcon(restaurants, restaurantId, restaurantIndex);
    }

    new RestaurantDetailModal(
      restaurants[restaurantIndex],
      this.onClickDeleteButton.bind(this),
      this.toggleRestaurantDetailModal
    );
  }

  onClickStarIcon(restaurants, restaurantId, restaurantIndex) {
    const isLiked = !restaurants[restaurantIndex].liked;
    restaurants[restaurantIndex].liked = isLiked;

    const likeStar = $(`#${restaurantId} .like-star`);
    isLiked ? likeStar.classList.remove('hidden') : likeStar.classList.add('hidden');

    const updatedRestaurants = this.restaurants.updateRestaurant(restaurantId, isLiked);

    store.setLocalStorage('lunch_app_restaurants', updatedRestaurants);
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
      id: String('음식점' + new Date().getTime() + name.replaceAll(' ', '')),
      category,
      name,
      distance,
      description,
      link,
      liked: false,
    };

    this.restaurants.addRestaurant(restaurant);
    store.setLocalStorage('lunch_app_restaurants', this.restaurants.getRestaurants());

    this.toggleAddRestaurantModal();

    const curCategoryOption = $('#category-filter').value;
    if (curCategoryOption !== '전체' && category !== curCategoryOption) return;

    this.renderFilteredItems(this.state.filterCategory, this.state.sortOption);
  }

  onClickDeleteButton(restaurantId) {
    const restaurants = this.restaurants.deleteRestaurant(restaurantId);

    $(`#${restaurantId}`).remove();
    this.toggleRestaurantDetailModal();

    store.setLocalStorage('lunch_app_restaurants', restaurants);
  }

  toggleAddRestaurantModal() {
    $('.add-restaurant-modal').classList.toggle('modal--open');
  }

  toggleRestaurantDetailModal() {
    $('.restaurant-detail-modal').classList.toggle('modal--open');
  }
}
