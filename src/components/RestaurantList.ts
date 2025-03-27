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
  const render = (updatedRestaurants: Restaurant[]) => {
    if (!el) return;
    el.innerHTML = "";

    const fragment = document.createDocumentFragment();

    updatedRestaurants.forEach((restaurant: Restaurant) => {
      const restaurantItem = RestaurantItem({
        restaurantItem: restaurant,
        onFavorite: handleFavorite,
        onShowDetail: handleShowDetail,
      });

      fragment.appendChild(restaurantItem);
    });

    el.appendChild(fragment);
  };

  const handleFavorite = (id?: string) => {
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === id
        ? { ...restaurant, isFavorite: !restaurant.isFavorite }
        : restaurant
    );

    restaurantManager.toggleFavorite(id);
    setRestaurant(updatedRestaurants);

    const item = el?.querySelector(
      `[data-id="${id}"]`
    ) as FavoriteIconElement | null;
    if (item && item._favoriteIcon) {
      const favoriteIcon = item._favoriteIcon;

      const isFavorite = updatedRestaurants.find(
        (restaurant) => restaurant.id === id
      )?.isFavorite;

      favoriteIcon.src = isFavorite
        ? "images/favorite-icon-filled.png"
        : "images/favorite-icon-lined.png";
      favoriteIcon.dataset.favorite = String(isFavorite);
    }
  };

  const handleDelete = (id: string) => {
    const updatedRestaurants = restaurants.filter(
      (restaurant) => restaurant.id !== id
    );

    restaurantManager.delete(id);
    setRestaurant(updatedRestaurants);
    render(updatedRestaurants);
  };

  const handleShowDetail = (id: string) => {
    const targetRestaurant = restaurants.find(
      (restaurant) => restaurant.id === id
    );

    if (targetRestaurant) {
      showRestaurantDetailModal(targetRestaurant, handleDelete, handleFavorite);
    }
  };

  render(restaurants);
};

export default RestaurantList;
