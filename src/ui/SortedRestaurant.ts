import { SortByDistance, SortByName } from "../domain/SortRestaurantByValue";

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
    if (target.value === "name") {
      sortedRestaurants = SortByName($restaurantItems);
    } else if (target.value === "distance") {
      sortedRestaurants = SortByDistance($restaurantItems);
    }
    $restaurantList.replaceChildren(...sortedRestaurants);
  });
}
