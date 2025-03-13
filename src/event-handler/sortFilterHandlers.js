import createRestaurantItem from "../components/restaurant/item/item";
import Toast from "../components/Toast/Toast";
import { DICTIONARY } from "../settings/settings";
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

export function handleSort(sortFor, restaurantList, restaurantListElement) {
  const restaurantItems = Array.from(restaurantListElement.children);

  localStorage.setItem("sort", sortFor);

  const sortedItems = sortList(restaurantItems, sortFor);

  sortedItems.forEach((item) => restaurantListElement.appendChild(item));
  Toast.showToast(`${DICTIONARY[sortFor]}순으로 식당을 정렬합니다.`, "info");
}

export function handleCombinedFilter(
  event,
  restaurantListElement,
  restaurantList
) {
  while (restaurantListElement.firstChild) {
    restaurantListElement.removeChild(restaurantListElement.firstChild);
  }
  const categoryFilter = document.getElementById("category-filter").value;
  const favoriteFilter = document.querySelector(
    'input[name="favoriteFilter"]:checked'
  ).value;

  let filteredList = restaurantList.List;

  if (favoriteFilter !== "all") {
    filteredList = filteredList.filter(({ isFavorite }) => isFavorite);
  }

  if (categoryFilter !== "전체") {
    filteredList = filteredList.filter(
      ({ category }) => category === categoryFilter
    );
  }

  const sortOption = localStorage.getItem("sort") || "name";
  const sortedList = sortList(filteredList, sortOption);

  sortedList.forEach((restaurantItem) =>
    restaurantListElement.appendChild(createRestaurantItem(restaurantItem))
  );

  if (event.target.value === "all" || event.target.value === "전체") {
    Toast.showToast("모든 음식점을 보여줄께요.", "info");
  } else {
    Toast.showToast(
      `${DICTIONARY[event.target.value]}만 보여드릴께요.`,
      "info"
    );
  }
}
