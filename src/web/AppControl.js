import { createDropDown } from '../component/dropDown';
import createHeader from '../component/header';
import createRestaurantCard from '../component/restaurantCard';
import { createtabBar } from '../component/tabBar';
import {
  categoryFilterList,
  sortingFilterLsit,
} from '../constant/select';
import { RestaurantManager } from '../domain/RestaurantManager';

export class appController {
  #restaurantManager;
  #currentTab;

  constructor(){
    const totalRestaurantsData = JSON.parse(localStorage.getItem('restaurants')) || [];
    const favoriteRestaurantsData = JSON.parse(localStorage.getItem('favoriteRestaurants')) || [];
    this.#restaurantManager = new RestaurantManager(totalRestaurantsData, favoriteRestaurantsData);
    this.#currentTab = '모든 음식점';
  } 

  setMainPage() {
    document.body.insertAdjacentElement(
      'afterbegin',
      createtabBar([{
        className: 'tab__bar__item__checked',
        text: '모든 음식점',
        callback: () => {
          this.updateRestaurantList(this.#restaurantManager.getUpdatedTotalRsetaurants())
          this.#currentTab = '모든 음식점';
      }},{
        className: 'tab__bar__item',
        text: '자주 가는 음식점',
        callback: () => {
          this.updateRestaurantList(this.#restaurantManager.getUpdatedFavoriteRestaurants());
          this.#currentTab = '자주 가는 음식점';
        }
        
      }])
    );
    document.body.insertAdjacentElement(
      'afterbegin',
      createHeader({
        className: 'gnb',
        left: 'logo',
        right: 'RestaurantAdditionButton',
        restaurantManager: this.#restaurantManager,
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
          this.#restaurantManager.udateCurentCategoty(category);  
          if(this.#currentTab === '모든 음식점')
          return this.updateRestaurantList(
            this.#restaurantManager.getUpdatedTotalRsetaurants()
          );
          if(this.#currentTab === '자주 가는 음식점');
          return this.updateRestaurantList(
            this.#restaurantManager.getUpdatedFavoriteRestaurants()
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
          this.#restaurantManager.udateCurentSelectedSorting(category);
          if(this.#currentTab === '모든 음식점')
          return this.updateRestaurantList(
            this.#restaurantManager.getUpdatedTotalRsetaurants()
          );
          if(this.#currentTab === '자주 가는 음식점');
          return this.updateRestaurantList(
            this.#restaurantManager.getUpdatedFavoriteRestaurants()
          );
        },
      })
    );

    this.updateRestaurantList(this.#restaurantManager.getUpdatedTotalRsetaurants());
  }

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

      const favoriteRestaurantNames = this.#restaurantManager.getUpdatedFavoriteRestaurants().map(({name}) => name);

      const categoryDiv = createRestaurantCard(restaurant, favoriteRestaurantNames);
      listItem.addEventListener('click', (event) => this.chageStar(event, restaurant));
      listItem.append(categoryDiv);
      restaurantList.append(listItem);
    });

    restaurantListContainer.appendChild(restaurantList);
  }

  chageStar(event, restaurant){
    const target = event.target;
    if(target.className === 'star lined'){
      this.#restaurantManager.addFavoriteRestaurant(restaurant);
      target.src= './favorite-icon-filled.png';
      target.className = 'star filled';
    } else if(target.className === 'star filled'){
      this.#restaurantManager.removeFavoriteRestaurant(restaurant);
      target.src = './favorite-icon-lined.png';
      target.className = 'star lined';
    }
  }
};
