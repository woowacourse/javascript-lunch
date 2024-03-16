import createRestaurantList from '../component/restaurantList.js';
import { categoryFilterList, sortingFilterList } from '../constant/cons.js';
import { $ } from '../utils/selector.js';

function createAllRestaurantList({
  restaurantManager,
  favoriteRestaurantList,
}) {
  createFilterContainer({ restaurantManager, favoriteRestaurantList });
  createRestaurantList({
    restaurantList: restaurantManager.getRestaurantList(),
    toggleFavorite: favoriteRestaurantList.toggleRestaurant,
    hasFavorite: favoriteRestaurantList.hasRestaurant,
  });
}

function createFilterContainer({ restaurantManager, favoriteRestaurantList }) {
  const filterContainer = $('.restaurant-filter-container');

  filterContainer.appendChild(
    createDropDown({
      name: 'category',
      id: 'category-filter',
      options: categoryFilterList,
      className: 'restaurant-filter',
      callback: (category) => {
        restaurantManager.setCurrentCategory(category);

        if (category === '전체')
          return createRestaurantList({
            restaurantList: restaurantManager.getRestaurantList(),
            toggleFavorite: favoriteRestaurantList.toggleRestaurant,
            hasFavorite: favoriteRestaurantList.hasRestaurant,
          });

        createRestaurantList({
          restaurantList: restaurantManager.getRestaurantList(),
          toggleFavorite: favoriteRestaurantList.toggleRestaurant,
          hasFavorite: favoriteRestaurantList.hasRestaurant,
        });
      },
    })
  );

  filterContainer.appendChild(
    createDropDown({
      name: 'sorting',
      id: 'sorting-filter',
      className: 'restaurant-filter',
      options: sortingFilterList,
      callback: (category) => {
        if (category === '이름순')
          createRestaurantList({
            restaurantList: restaurantManager.sortByAscendingNameAndCategory(),
            toggleFavorite: favoriteRestaurantList.toggleRestaurant,
            hasFavorite: favoriteRestaurantList.hasRestaurant,
          });
        if (category === '거리순')
          createRestaurantList({
            restaurantList:
              restaurantManager.sortByAscendingWalkingTimeAndCategory(),
            toggleFavorite: favoriteRestaurantList.toggleRestaurant,
            hasFavorite: favoriteRestaurantList.hasRestaurant,
          });
      },
    })
  );
}

export { createAllRestaurantList };
