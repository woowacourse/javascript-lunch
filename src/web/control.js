import { createDropDown } from '../component/dropDown';
import createHeader from '../component/header';
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
        right: 'add',
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

      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'restaurant__category';

      // <img> 요소 생성 및 설정
      const categoryImg = document.createElement('img');
      categoryImg.src = `./category-${
        KOREAN_CATEGORY[restaurant.category]
      }.png`;
      categoryImg.alt = restaurant.category;
      categoryImg.className = 'category-icon';

      // <img>를 카테고리 <div>에 추가
      categoryDiv.append(categoryImg);

      // 정보 <div> 생성
      const infoDiv = document.createElement('div');
      infoDiv.className = 'restaurant__info';

      // <h3> 요소 생성 및 설정
      const restaurantName = document.createElement('h3');
      restaurantName.className = 'restaurant__name text-subtitle';
      restaurantName.textContent = restaurant.name;

      // 거리 <span> 생성 및 설정
      const restaurantDistance = document.createElement('span');
      restaurantDistance.className = 'restaurant__distance text-body';
      restaurantDistance.textContent = `캠퍼스부터 ${restaurant.walkingTime}분 내`;

      // 설명 <p> 생성 및 설정
      const restaurantDescription = document.createElement('p');
      restaurantDescription.className = 'restaurant__description text-body';
      restaurantDescription.textContent = restaurant?.description;

      // 요소들을 infoDiv에 추가
      infoDiv.append(restaurantName);
      infoDiv.append(restaurantDistance);
      infoDiv.append(restaurantDescription);

      // 카테고리 <div>와 정보 <div>를 최상위 <li>에 추가
      listItem.append(categoryDiv);
      listItem.append(infoDiv);
      restaurantList.append(listItem);
    });

    restaurantListContainer.appendChild(restaurantList);
  },
};
