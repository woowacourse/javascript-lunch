import RestaurantList from "./components/RestaurantList";

export default function InitRestaurantList() {
  const $restaurantListContainer = document.querySelector(
    ".restaurant-list-container"
  );
  RestaurantList($restaurantListContainer);
}
