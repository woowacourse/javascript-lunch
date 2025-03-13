import { initialRestaurants } from "../data/initialRestaurants.js";

// 저장된 필터
const currentFilter = {
  category: null,
};

function applyFilter() {
  const $restaurantItems = document.querySelectorAll(".restaurant");

  if ($restaurantItems.length === 0) {
    console.warn("필터링할 레스토랑 항목이 없습니다.");
    return;
  }

  $restaurantItems.forEach((item) => {
    item.style.display = "flex";

    if (currentFilter.category !== null) {
      const itemCategory = item.dataset.category;

      if (itemCategory !== currentFilter.category) {
        item.style.display = "none";
      }
    }
  });
}

export function handleCategoryFilter(e) {
  const selectedCategory = e.target.value;
  currentFilter.category = selectedCategory === "all" ? null : selectedCategory;
  applyFilter();
}

export function resetAllFilters() {
  currentFilter.category = null;

  const $categoryFilter = document.getElementById("category-filter");
  if ($categoryFilter) {
    $categoryFilter.value = "all";
  }

  applyFilter();
}

export function setupFilterEventListeners() {
  const $categoryFilter = document.getElementById("category-filter");
  const $resetButton = document.querySelector(".filter-reset-button");

  if ($categoryFilter) {
    $categoryFilter.addEventListener("change", handleCategoryFilter);
  } else {
    console.warn("카테고리 필터 요소를 찾을 수 없습니다.");
  }

  if ($resetButton) {
    $resetButton.addEventListener("click", resetAllFilters);
  } else {
    console.warn("필터 초기화 버튼을 찾을 수 없습니다.");
  }
}
