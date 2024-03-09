import { createDropDown } from '../component/dropDown';
import createHeader from '../component/header';
import createRestaurantCard from '../component/restaurantCard';
import {
  KOREAN_CATEGORY,
  categoryFilterList,
  sortingFilterLsit,
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
        right: 'RestaurantAdditionButton',
        restaurantManager,
      })
    );

    const restaurantFilterContainer = document.querySelector(
      '.restaurant-filter-container'
    );

    restaurantFilterContainer.appendChild(
      createDropDown({
        name: 'categoty',
        id: 'category-filter',
        options: categoryFilterList,
        className: 'restaurant-filter',
        callback: (category) => {
          if (category === '전체'){
            restaurantManager.udateFilterRestaurants();
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
        options: sortingFilterLsit,
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

    this.updateRestaurantList(restaurantManager.sortByAscendingName());
  },

  updateRestaurantList(restaurants) {
    const restaurantListContainer = document.querySelector(
      '.restaurant-list-container'
    );
    restaurantListContainer.replaceChildren();
    const restaurantList = document.createElement('ul');
    restaurantList.className = 'restaurant-list';

    restaurants.map((restaurant) => {
      const listItem = document.createElement('li');
      listItem.className = 'restaurant';

      const categoryDiv = createRestaurantCard(restaurant);
      listItem.append(categoryDiv);
      restaurantList.append(listItem);
    });

    restaurantListContainer.appendChild(restaurantList);
  },
};
