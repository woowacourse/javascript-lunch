import { filterByCategory, sortByCondition } from '../handlers/filterHandlers.ts';
import { reRenderRestaurantList } from '../utils/renderUtils.ts';

export function updateRestaurantListBasedOnActiveTab() {
  const activeTab = document.querySelector('.tab.active') as HTMLElement;

  const categoryFilter = document.getElementById('category-filter') as HTMLSelectElement;
  const sortingFilter = document.getElementById('sorting-filter') as HTMLSelectElement;
  const currentCategory = categoryFilter ? categoryFilter.value : '전체';
  const currentSorting = sortingFilter ? sortingFilter.value : '이름순';

  const filteredRestaurants = filterByCategory(currentCategory);
  const sortedRestaurants = sortByCondition(filteredRestaurants, currentSorting);

  if (activeTab && activeTab.id === 'favorites') {
    const favorites = sortedRestaurants.filter((restaurant) => restaurant.isFavorite);
    reRenderRestaurantList(favorites);
    return;
  }
  reRenderRestaurantList(sortedRestaurants);
}
