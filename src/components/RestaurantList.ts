import RestaurantItem from "./RestaurantItem.ts";
import { showRestaurantDetailModal } from "./RestaurantDetailModal.ts";
import { Restaurant } from "../types/restaurant.ts";
import { restaurantManager } from "../restaurantManager.ts";

type RestaurantListProps = {
  restaurants: Restaurant[];
  setRestaurant: (restaurants: Restaurant[]) => void;
  el?: Element;
};

const RestaurantList = ({
  restaurants,
  setRestaurant,
  el,
}: RestaurantListProps) => {
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

  const handleShowDetail = (id: string) => {
    const targetRestaurant = localRestaurants.find(
      (restaurant) => restaurant.id === id
    );

    if (targetRestaurant) {
      showRestaurantDetailModal(targetRestaurant, handleDelete, handleFavorite);
    }
  };

  const render = (restaurants: Restaurant[]) => {
    if (!el) return;
    el.innerHTML = "";

    const fragment = document.createDocumentFragment();

    restaurants.forEach((restaurant: Restaurant) => {
      const restaurantItem = RestaurantItem({
        restaurantItem: restaurant,
        onFavorite: handleFavorite,
        onShowDetail: handleShowDetail,
      });

      fragment.appendChild(restaurantItem);
    });

    el.appendChild(fragment);
  };

  render(localRestaurants);
};

export default RestaurantList;
