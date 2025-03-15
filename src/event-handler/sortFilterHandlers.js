import createRestaurantItem from "../components/restaurant/item/item";
import Toast from "../components/Toast/Toast";
import { DICTIONARY } from "../settings/dictionary";

export function handleSort(sortFor, restaurantList, restaurantListElement) {
  const restaurantItems = Array.from(restaurantListElement.children);

  localStorage.setItem("sort", sortFor);

  const sortedItems = sortList(restaurantItems, sortFor);

  sortedItems.forEach((item) => restaurantListElement.appendChild(item));
  Toast.showToast(`${DICTIONARY[sortFor]}순으로 식당을 정렬합니다.`, "info");
}
function sortList(list, sortOption) {
  return list.sort((a, b) => {
    const nameA = a.name || a.dataset.name;
    const nameB = b.name || b.dataset.name;
    const distanceA = Number(a.distance || a.dataset.distance);
    const distanceB = Number(b.distance || b.dataset.distance);

    if (sortOption === "distance") {
      return distanceA - distanceB || nameA.localeCompare(nameB);
    }

    return nameA.localeCompare(nameB) || distanceA - distanceB;
  });
}

export function handleCombinedFilter(
  event,
  restaurantListElement,
  restaurantList
) {
  clearRestaurantList(restaurantListElement);

  const { categoryFilter, favoriteFilter } = getFilterValues();
  let filteredList = applyFilters(
    restaurantList.List,
    categoryFilter,
    favoriteFilter
  );
  const sortedList = applySorting(filteredList);

  updateRestaurantListUI(restaurantListElement, sortedList);
  showFilterToast(event.target.value);
}

function clearRestaurantList(restaurantListElement) {
  while (restaurantListElement.firstChild) {
    restaurantListElement.removeChild(restaurantListElement.firstChild);
  }
}

function getFilterValues() {
  return {
    categoryFilter: document.getElementById("category-filter").value,
    favoriteFilter: document.querySelector(
      'input[name="favoriteFilter"]:checked'
    ).value,
  };
}

function applyFilters(restaurantList, categoryFilter, favoriteFilter) {
  let filteredList = restaurantList;

  if (favoriteFilter !== "all") {
    filteredList = filteredList.filter(({ isFavorite }) => isFavorite);
  }

  if (categoryFilter !== "전체") {
    filteredList = filteredList.filter(
      ({ category }) => category === categoryFilter
    );
  }

  return filteredList;
}

function applySorting(filteredList) {
  const sortOption = localStorage.getItem("sort") || "name";
  return sortList(filteredList, sortOption);
}

function updateRestaurantListUI(restaurantListElement, sortedList) {
  sortedList.forEach((restaurantItem) =>
    restaurantListElement.appendChild(createRestaurantItem(restaurantItem))
  );
}

function showFilterToast(filterValue) {
  if (filterValue === "all" || filterValue === "전체") {
    Toast.showToast("모든 음식점을 보여줄께요.", "info");
  } else {
    Toast.showToast(`${DICTIONARY[filterValue]}만 보여드릴께요.`, "info");
  }
}
