import { getFavoriteRestaurants } from '../../service/favoriteService.ts';
import { getAllRestaurants } from '../../service/restaurantService.ts';
import { $ } from '../../util/selector.js';
import RestaurantList from '../restaurant/RestaurantList.js';
import Tab from './Tab.ts';

function RestaurantTab() {
  const tabContainer = Tab({
    tabs: [
      { label: '모든 음식점', onClick: () => renderRestaurantList(false) },
      { label: '자주 가는 음식점', onClick: () => renderRestaurantList(true) }
    ]
  });

  requestAnimationFrame(() => renderRestaurantList(false));
  return tabContainer;
}

export default RestaurantTab;

async function renderRestaurantList(showFavorites: boolean) {
  const restaurantListContainer = $('.restaurant-list-container');
  if (!restaurantListContainer) return;

  restaurantListContainer.innerHTML = '';

  const restaurants = showFavorites ? await getFavoriteRestaurants() : await getAllRestaurants();
  const newList = RestaurantList({ restaurants });
  restaurantListContainer.appendChild(newList);
}
