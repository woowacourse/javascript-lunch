import { createDropDown } from '../component/dropDown';
import createHeader from '../component/header';
import createRestaurantCard from '../component/restaurantCard';
import renderRestaurantList from '../component/restaurantList.js';
import {
  KOREAN_CATEGORY,
  categoryFilterList,
  sortingFilterList,
} from '../constant/cons';
import { RestaurantManager } from '../domain/RestaurantManager';

export const set = {
  start() {
    const data = JSON.parse(localStorage.getItem('restaurants')) || [];
    const restaurantManager = new RestaurantManager(data);

    this.setMainPage(restaurantManager);
  },

  setMainPage(restaurantManager) {
    document.body.insertAdjacentElement(
      'afterbegin',
      createHeader({
        className: 'gnb',
        left: 'logo',
        right: 'add',
        addRestaurant: (restaurant) => restaurantManager.add(restaurant),
        getRestaurants: () => restaurantManager.getRestaurants(),
      })
    );

    const restaurantFilterContainer = document.querySelector(
      '.restaurant-filter-container'
    );

    restaurantFilterContainer.appendChild(
      createDropDown({
        name: 'category',
        id: 'category-filter',
        options: categoryFilterList,
        className: 'restaurant-filter',
        callback: (category) => {
          if (category === '전체') {
            // restaurantManager.updateFilterRestaurants();
            return this.updateRestaurantList(
              restaurantManager.getRestaurants()
            );
          }

          this.updateRestaurantList(
            restaurantManager.filteredRestaurants(category)
          );
        },
      })
    );

    restaurantFilterContainer.appendChild(
      createDropDown({
        name: 'sorting',
        id: 'sorting-filter',
        className: 'restaurant-filter',
        options: sortingFilterList,
        callback: (category) => {
          if (category === '이름순')
            this.updateRestaurantList(restaurantManager.sortByAscendingName());
          if (category === '거리순')
            this.updateRestaurantList(
              restaurantManager.sortByAscendingWalkingTime()
            );
        },
      })
    );

    renderRestaurantList(restaurantManager.sortByAscendingName());
  },
};
