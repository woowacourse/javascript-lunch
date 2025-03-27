import createRestaurantItem from "./RestaurantItem.ts";
import { showRestaurantDetailModal } from "./RestaurantDetailModal.ts";
import { Restaurant } from "../types/restaurant.ts";
import { restaurantManager } from "../restaurantManager.ts";

const renderRestaurantList = (
  restaurants: Restaurant[],
  setRestaurant: (restaurants: Restaurant[]) => void,
  el?: Element
) => {
  let localRestaurants: Restaurant[] = restaurants;

  const handleFavorite = (id?: string) => {
    const updatedRestaurants = localRestaurants.map((restaurant) =>
      restaurant.id === id
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );
    restaurantManager.toggleFavorite(id);
    setRestaurant(updatedRestaurants);
    localRestaurants = updatedRestaurants;
    render(localRestaurants);
  };

  const handleDelete = (id: string) => {
    const updatedRestaurants = localRestaurants.filter(
      (restaurant) => restaurant.id !== id
    );
    restaurantManager.delete(id);
    setRestaurant(updatedRestaurants);
    localRestaurants = updatedRestaurants;
    render(localRestaurants);
  };

  const render = (restaurants: Restaurant[]) => {
    if (!el) return;
    el.innerHTML = "";

    const fragment = document.createDocumentFragment();

    restaurants.forEach((restaurant: Restaurant) => {
      const restaurantItem = createRestaurantItem(restaurant);

      if (!restaurant.id) return;
      restaurantItem.setAttribute("data-id", restaurant.id);
      fragment.appendChild(restaurantItem);
    });

    el.appendChild(fragment);

    el.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const restaurantItem = target.closest("[data-id]") as HTMLElement;
      if (!restaurantItem) return;

      const restaurantId = restaurantItem.getAttribute("data-id");
      if (!restaurantId) return;

      if (
        target instanceof HTMLImageElement &&
        target.classList.contains("favorite-icon")
      ) {
        handleFavorite(restaurantId);
        return;
      }

      const restaurant = restaurants.find(
        (restaurant) => restaurant.id === restaurantId
      );
      if (restaurant) {
        showRestaurantDetailModal(restaurant, handleDelete, handleFavorite);
      }
    });
  };

  render(localRestaurants);
};

export default renderRestaurantList;
