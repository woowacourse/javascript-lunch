import { createDropDown } from '../component/dropDown';
import createHeader from '../component/header';
import createRestaurantCard from '../component/restaurantCard';
import { createtabBar } from '../component/tabBar';
import {
  categoryFilterList,
  sortingFilterLsit,
} from '../constant/select';
import { RestaurantManager } from '../domain/RestaurantManager';

export const appController = {
  start() {
    const data = JSON.parse(localStorage.getItem('restaurants')) || [];
    const restaurantManager = new RestaurantManager(data);

    this.setMainPage(restaurantManager);
  },

  setMainPage(restaurantManager) {
    document.body.insertAdjacentElement(
      'afterbegin',
      createtabBar([{
        className: 'tab__bar__item__checked',
        text: '모든 음식점'
      },{
        className: 'tab__bar__item',
        text: '자주 가는 음식점'
      }])
    );
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
          restaurantManager.udateCurentCategoty(category);
          if (category === '전체'){
            return this.updateRestaurantList(
              restaurantManager.getRestaurants()
            );
          }
            
          this.updateRestaurantList(
            restaurantManager.filteredRestaurants()
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
          restaurantManager.udateCurentSelectedSorting(category);
          if (category === '이름순')
            this.updateRestaurantList(restaurantManager.sortByAscendingName());
          if (category === '거리순')
            this.updateRestaurantList(
              restaurantManager.sortByAscendingWalkingTime()
            );
        },
      })
    );

    this.updateRestaurantList(restaurantManager.getRestaurants());
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
      listItem.addEventListener('click', (event) => this.chageStar(event));
      listItem.append(categoryDiv);
      restaurantList.append(listItem);
    });

    restaurantListContainer.appendChild(restaurantList);
  },

  chageStar(event){
    const target = event.target;
    if(target.className === 'star lined'){
      target.src= './favorite-icon-filled.png';
      target.className = 'star filled';
    } else if(target.className === 'star filled'){
      target.src = './favorite-icon-lined.png';
      target.className = 'star lined';
    }
  }
};
