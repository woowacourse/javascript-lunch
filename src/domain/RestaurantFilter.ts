import "../types/restaurant";

const RestaurantFilter = {
  categorizeRestaurants(category: Category, restaurants: RestaurantInfo[]): RestaurantInfo[] {
    if (category === "전체") return restaurants;
    return [...restaurants].filter((restaurant) => restaurant.category === category);
  },

  sortRestaurants(sortingWay: SortingWay, restaurants: RestaurantInfo[]): RestaurantInfo[] {
    if (sortingWay === "distance") return [...restaurants].sort((a, b) => a.distance - b.distance);

    return [...restaurants].sort((a, b) => (a.name > b.name ? 1 : -1));
  },
};

export default RestaurantFilter;
