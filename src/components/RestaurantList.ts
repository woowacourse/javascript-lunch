import RestaurantItem from "./RestaurantItem.ts";
import RestaurantDetailModal from "./RestaurantDetailModal.ts";
import { Category, Restaurant, SortType } from "../types/restaurant.ts";
import { restaurantManager } from "../restaurantManager.ts";

type RestaurantListProps = {
  restaurants: Restaurant[];
  filter: {
    tab: string;
    category: Category;
    sortType: SortType;
  };
  setRestaurant: (restaurants: Restaurant[]) => void;
  el: Element;
};

const RestaurantList = ({
  restaurants,
  setRestaurant,
  el,
  filter,
}: RestaurantListProps) => {
  const render = () => {
    const displayRestaurants =
      filter.tab === "자주 가는 음식점"
        ? restaurantManager.getFavoriteList(restaurants)
        : restaurantManager.getFilterAndSortList(
            restaurants,
            filter.category,
            filter.sortType
          );

    const fragment = document.createDocumentFragment();

    displayRestaurants.forEach((restaurant: Restaurant) => {
      const restaurantItem = RestaurantItem({
        restaurantItem: restaurant,
        onFavorite: handleFavorite,
        onShowDetail: handleShowDetail,
      });

      fragment.appendChild(restaurantItem);
    });

    el.replaceChildren(fragment);
  };

  const handleFavorite = (id: string, isFavorite: boolean) => {
    const targetRestaurant = restaurants.find(
      (restaurant) => restaurant.id === id
    );

    if (!targetRestaurant) return;

    const updatedRestaurants = restaurants.map((restaurant) => {
      if (restaurant.id === id) {
        return {
          ...restaurant,
          isFavorite,
        };
      }
      return restaurant;
    });

    restaurantManager.toggleFavorite(id, isFavorite);
    setRestaurant(updatedRestaurants);
  };

  const handleDelete = (id: string) => {
    const updatedRestaurants = restaurants.filter(
      (restaurant) => restaurant.id !== id
    );

    restaurantManager.delete(id);
    setRestaurant(updatedRestaurants);
  };

  const handleShowDetail = (id: string) => {
    const targetRestaurant = restaurants.find(
      (restaurant) => restaurant.id === id
    );

    if (!targetRestaurant) return;

    RestaurantDetailModal(targetRestaurant, handleDelete, handleFavorite);
  };

  render();
};

export default RestaurantList;
