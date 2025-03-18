const SortType = {
  NAME: "name",
  DISTANCE: "distance",
} as const;

export default function SortedRestaurant() {
  const $sortSelect = document.getElementById(
    "sorting-filter"
  ) as HTMLSelectElement;

  $sortSelect.addEventListener("change", (e) => {
    const $restaurantList = document.querySelector(
      ".restaurant-list"
    ) as HTMLUListElement;
    const $restaurantItems: HTMLElement[] = Array.from(
      document.querySelectorAll(".restaurant")
    );

    let sortedRestaurants = [] as HTMLElement[];
    const target = e.target as HTMLSelectElement;

    if (target.value === SortType.NAME) {
      sortedRestaurants = SortByName($restaurantItems);
    } else if (target.value === SortType.DISTANCE) {
      sortedRestaurants = SortByDistance($restaurantItems);
    }
    $restaurantList.replaceChildren(...sortedRestaurants);
  });
}

function SortByName($restaurantItems: HTMLElement[]) {
  return $restaurantItems.sort((a, b) => {
    const aName =
      (a.querySelector(".restaurant__name") as HTMLElement)?.textContent ?? "";
    const bName =
      (b.querySelector(".restaurant__name") as HTMLElement)?.textContent ?? "";

    return aName.localeCompare(bName);
  });
}

function SortByDistance($restaurantItems: HTMLElement[]) {
  return $restaurantItems.sort((a, b) => {
    const aDistanceText =
      (a.querySelector(".restaurant__distance") as HTMLElement)?.textContent ??
      "";
    const bDistanceText =
      (b.querySelector(".restaurant__distance") as HTMLElement)?.textContent ??
      "";

    const aDistance = parseFloat(aDistanceText.replace(/[^0-9]/g, "")) || 0;
    const bDistance = parseFloat(bDistanceText.replace(/[^0-9]/g, "")) || 0;

    return aDistance - bDistance;
  });
}
