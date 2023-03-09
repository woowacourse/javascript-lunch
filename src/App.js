import { $, $$ } from './utils/dom';

import CreateRestaurantModal from './components/CreateRestaurantModal';
import Header from './components/Header';
import RestaurantFilterContainer from './components/RestaurantFilterContainer';
import RestaurantItems from './components/RestaurantItems';

import Restaurants from './domain/Restaurants';
import Validator from './domain/Validator';

import store from './utils/store';
import UpperTab from './components/UpperTab';

export default class App {
  restaurants;
  state;

  constructor() {
    this.state = {
      filterCategory: '전체',
      sortOption: 'name',
      navTab: '모든 음식점',
    };

    const restaurantsData = store.getLocalStorage();
    this.restaurants = new Restaurants(restaurantsData);

    new Header(this.onClickModalOpenButton.bind(this));
    new UpperTab(this.onClickNavTab.bind(this));
    new RestaurantFilterContainer(this.setState.bind(this));
    this.renderFilteredItems(this.state.filterCategory, this.state.sortOption);
    new CreateRestaurantModal(this.onSubmitAddRestaurantForm.bind(this), this.toggleModal);
  }

  renderLikedItems() {
    const likedRestaurants = this.restaurants.getLikedRestaurants();

    new RestaurantItems(likedRestaurants);
  }

  onClickModalOpenButton() {
    $('.add-restaurant-form').reset();
    this.toggleModal();
  }

  onClickNavTab(e) {
    const navElements = $$('.upper-Tab > div');
    const clickedElement = e.target;

    navElements.forEach((navElement) => {
      if (navElement !== clickedElement) navElement.classList.remove('selected');
    });
    clickedElement.classList.add('selected');

    if (clickedElement.innerText === '자주 가는 음식점') {
      $('.restaurant-filter-container').classList.toggle('hidden');
    } else {
      $('.restaurant-filter-container').classList.remove('hidden');
    }

    this.setState({ navTab: clickedElement.innerText });
  }

  setState(obj) {
    this.state = { ...this.state, ...obj };
    const key = Object.keys(obj)[0];

    if (key === 'navTab' && obj[key] === '자주 가는 음식점') {
      return this.renderLikedItems();
    }

    this.renderFilteredItems(this.state.filterCategory, this.state.sortOption);
  }

  renderFilteredItems(filterCategory, sortOption) {
    const filteredRestaurants = this.restaurants.getFilteredRestaurantsByCategory(filterCategory);

    const sortedRestaurants = this.restaurants.getSortedRestaurants(
      filteredRestaurants,
      sortOption
    );

    new RestaurantItems(
      sortedRestaurants,
      this.restaurants.updateRestaurant.bind(this.restaurants)
    );
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
    store.setLocalStorage(this.restaurants.getRestaurants());

    this.toggleModal();

    const curCategoryOption = $('#category-filter').value;
    if (curCategoryOption !== '전체' && category !== curCategoryOption) return;

    this.renderFilteredItems(this.state.filterCategory, this.state.sortOption);
  }

  toggleModal() {
    $('.modal').classList.toggle('modal--open');
  }
}
