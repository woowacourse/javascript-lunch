import "../types/restaurant";

export const RestaurantFilter = {
  categorizeRestaurants(
    category: Category,
    restaurants: Restaurant[]
  ): Restaurant[] {
    return [...restaurants].filter(
      (restaurant) => restaurant.category === category
    );
  },

  sortRestaurants(
    sortingWay: SortingWay,
    restaurants: Restaurant[]
  ): Restaurant[] {
    if (sortingWay === "distance")
      return [...restaurants].sort((a, b) => a.distance - b.distance);

    return [...restaurants].sort((a, b) => (a.name > b.name ? 1 : -1));
  },
};
