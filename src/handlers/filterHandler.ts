/* eslint-disable radix */
import { initialRestaurants } from "../data/initialRestaurants.ts";
import { tabState } from "./tabHandler.ts";
import { Category, Restaurant } from "../../types/Restaurant.ts";
import { RestaurantElement } from "../../types/DomTypes.ts";
// 저장된 필터

interface FilterState {
  category : Category | null;
  sortBy : "distance" | "name";

}

const currentFilter : FilterState = {
  category: null,
  sortBy: "distance", // 기본 정렬은 거리순
};

export function applyFilter() : void {
  const $restaurantItems = document.querySelectorAll(".restaurant");
  if ($restaurantItems.length === 0) {
    console.warn("필터링할 레스토랑 항목이 없습니다.");
    return;
  }

  // 카테고리 필터 적용
  $restaurantItems.forEach((item) => {
    const restaurantItem = item as RestaurantElement;
    restaurantItem.style.display = "flex";

    if (currentFilter.category !== null) {
      const itemCategory = restaurantItem.dataset.category;

      if (itemCategory !== currentFilter.category) {
        restaurantItem.style.display = "none";
      }
    }

    // 탭필터 (그 자주가는 음식점이 활성화 된 경우)
    if (tabState.activeTab === "favorites") {
      const isFavorite = restaurantItem.dataset.favorites === "true";

      if (!isFavorite) {
        restaurantItem.style.display = "none";
      }
    }
  });

  // 정렬 적용
  if (currentFilter.sortBy !== null) {
    const $restaurantList = document.querySelector(".restaurant-list");
    if (!$restaurantList) return;

    // 목록의 모든 요소를 배열로 변환
    const visibleItems = Array.from($restaurantList.children);

    visibleItems.sort((a, b) => {
      if (currentFilter.sortBy === "distance") {
        const distanceTextA = a.querySelector(".restaurant__distance")?.textContent || "0";
        const distanceTextB = b.querySelector(".restaurant__distance")?.textContent || "0";
        const distanceA = parseInt(distanceTextA.match(/\d+/)?.[0] || "0");
        const distanceB = parseInt(distanceTextB.match(/\d+/)?.[0] || "0");
        return distanceA - distanceB;
      }
      if (currentFilter.sortBy === "name") {
         const nameA = a.querySelector(".restaurant__name")?.textContent || "";
        const nameB = b.querySelector(".restaurant__name")?.textContent || "";
        return nameA.localeCompare(nameB, "ko");
      }
      return 0;
    });

    // 정렬된 순서대로 DOM에 추가
    visibleItems.forEach((item) => {
      $restaurantList.appendChild(item);
    });
  }
}

export function handleCategoryFilter(e : Event) : void {
  const target = e.target as HTMLSelectElement;
  const selectedCategory = target.value;
  currentFilter.category = selectedCategory === "all" ? null : selectedCategory as Category;
  applyFilter();
}
export function handleSortingFilter(e: Event) {
  const target = e.target as HTMLSelectElement
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
