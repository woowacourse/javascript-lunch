import { restaurantStore } from '../store/restaurantStore.ts';
import { reRenderRestaurantList } from '../utils/renderUtils.ts';
import { State } from '../store/stateStore.ts';

export function filterByCategory(category: string): State[] {
  if (category === '전체') {
    return restaurantStore;
  }
  return restaurantStore.filter((restaurant) => restaurant.category === category);
}

export function sortByCondition(data: State[], sorting: string): State[] {
  if (sorting === '이름순') {
    return [...data].sort((a, b) => {
      const cmp = a.name.localeCompare(b.name);
      if (cmp !== 0) return cmp;
      return a.distance - b.distance;
    });
  }
  if (sorting === '거리순') {
    return [...data].sort((a, b) => {
      if (a.distance !== b.distance) return a.distance - b.distance;
      return a.name.localeCompare(b.name);
    });
  }
  return data;
}

export function applyFilters() {
  const categoryFilter = document.getElementById('category-filter') as HTMLSelectElement;
  const sortingFilter = document.getElementById('sorting-filter') as HTMLSelectElement;
  const currentCategory = categoryFilter ? categoryFilter.value : '전체';
  const currentSorting = sortingFilter ? sortingFilter.value : '이름순';

  const filteredRestaurants = filterByCategory(currentCategory);
  const sortedRestaurants = sortByCondition(filteredRestaurants, currentSorting);

  reRenderRestaurantList(sortedRestaurants);
}

export function registerCategoryFilter() {
  const categoryFilter = document.getElementById('category-filter');
  if (!categoryFilter) return;

  categoryFilter.addEventListener('change', applyFilters);
}

export function registerSortingFilter() {
  const sortingFilter = document.getElementById('sorting-filter');
  if (!sortingFilter) return;

  sortingFilter.addEventListener('change', applyFilters);
}
