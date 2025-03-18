import { SortByDistance, SortByName } from "../domain/SortRestaurantByValue";

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
