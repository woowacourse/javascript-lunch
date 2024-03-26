import { createDropDown } from '../component/dropDown.js';
import createRestaurantList from '../component/restaurantList.js';
import { categoryFilterList, sortingFilterList } from '../constant/cons.js';
import { $ } from '../utils/selector.js';

function createAllRestaurantList({
  restaurantManager,
  favoriteRestaurantList,
}) {
  createFilterContainer({ restaurantManager, favoriteRestaurantList });
  createRestaurantList({
    restaurantList: restaurantManager.getAppliedFiltersRestaurantList(),
    toggleFavorite: favoriteRestaurantList.toggleRestaurant,
    hasFavorite: favoriteRestaurantList.hasRestaurant,
  });
}

function createFilterContainer({ restaurantManager, favoriteRestaurantList }) {
  const filterContainer = $('.restaurant-filter-container');

  if (filterContainer.childNodes.length > 0) return;

  filterContainer.appendChild(
    createDropDown({
      name: 'category',
      id: 'category-filter',
      options: categoryFilterList,
      className: 'restaurant-filter',
      callback: (category) => {
        restaurantManager.setCurrentCategory(category);

        createRestaurantList({
          restaurantList: restaurantManager.getAppliedFiltersRestaurantList(),
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
      callback: (sortBy) => {
        restaurantManager.setSortBy(sortBy);

        createRestaurantList({
          restaurantList: restaurantManager.getAppliedFiltersRestaurantList(),
          toggleFavorite: favoriteRestaurantList.toggleRestaurant,
          hasFavorite: favoriteRestaurantList.hasRestaurant,
        });
      },
    })
  );
}

export { createAllRestaurantList };
