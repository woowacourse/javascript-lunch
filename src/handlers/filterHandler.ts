/* eslint-disable radix */
import { restaurantStore } from "../store/restaurantStore.ts";
import RestaurantItem from "../components/RestaurantItem.js";
import { setupRestaurantItemEventListeners } from "./detailModalHandler.ts";
import { setupFavoriteEventListeners } from "./favoriteHandler.ts";
import { Category } from "../../types/Restaurant.ts";

interface FilterState {
  category: Category | null;
  sortBy: "distance" | "name";
}

const currentFilter: FilterState = {
  category: null,
  sortBy: "distance", // 기본 정렬은 거리순
};

export function applyFilter(): void {
  const $restaurantList = document.querySelector(".restaurant-list");
  if (!$restaurantList) return;

  const $selectedTab = document.querySelector(".tab-button--active") as HTMLElement;
  const selectedFilter = $selectedTab?.dataset.tab || "all";

  // 1. 기본 필터링 (탭)
  let restaurants = restaurantStore.getRestaurants();
  let filteredRestaurants = restaurants.filter((restaurant) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "favorites") return restaurant.favorites;
    return restaurant.category === selectedFilter;
  });

  // 2. 카테고리 필터 적용
  if (currentFilter.category) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) => restaurant.category === currentFilter.category
    );
  }

  // 3. 정렬 적용
  filteredRestaurants.sort((a, b) => {
    if (currentFilter.sortBy === "distance") {
      return Number(a.distance) - Number(b.distance);
    }
    if (currentFilter.sortBy === "name") {
      return a.name.localeCompare(b.name, "ko");
    }
    return 0;
  });

  // 4. UI 업데이트
  $restaurantList.innerHTML = filteredRestaurants
    .map((restaurant) => RestaurantItem(restaurant))
    .join("");

  setupRestaurantItemEventListeners();
  setupFavoriteEventListeners();
}

export function handleCategoryFilter(e: Event): void {
  const target = e.target as HTMLSelectElement;
  const selectedCategory = target.value;
  currentFilter.category = selectedCategory === "all" ? null : selectedCategory as Category;
  applyFilter();
}

export function handleSortingFilter(e: Event): void {
  const target = e.target as HTMLSelectElement;
  const selectedSorting = target.value;
  currentFilter.sortBy = selectedSorting as "distance" | "name";
  applyFilter();
}

export function setupFilterEventListeners() : void {
  const $categoryFilter = document.getElementById("category-filter");
  const $sortingFilter = document.getElementById("sorting-filter");

  if ($categoryFilter) {
    $categoryFilter.addEventListener("change", handleCategoryFilter);
  } else {
    console.warn("카테고리 필터 요소를 찾을 수 없습니다.");
  }

  if ($sortingFilter) {
    $sortingFilter.addEventListener("change", handleSortingFilter);
  } else {
    console.warn("정렬 필터 요소를 찾을 수 없습니다.");
  }
}
