import { restaurantStore } from '../store/restaurantStore.ts';
import { reRenderRestaurantList } from '../utils/renderUtils.ts';

export function handleCategoryFilter(selectedCategory: string) {
  if (selectedCategory === '전체') {
    reRenderRestaurantList(restaurantStore);
    return;
  }

  const filteredRestaurants = restaurantStore.filter((restaurant) => restaurant.category === selectedCategory);
  reRenderRestaurantList(filteredRestaurants);
}

export function registerCategoryFilter() {
  const categoryFilter = document.getElementById('category-filter');
  if (!categoryFilter) return;

  categoryFilter.addEventListener('change', (event) => {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    handleCategoryFilter(selectedCategory);
  });
}
