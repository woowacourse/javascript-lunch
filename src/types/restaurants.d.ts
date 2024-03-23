interface RestaurantsInterface {
  initStorage(): void;
  filterByCategory(category: Category): Restaurant[];
  addRestaurant(restaurant: Restaurant): void;
  orderByDistance(restaurants: Restaurant[]): Restaurant[];
  orderByName(restaurants: Restaurant[]): Restaurant[];
  sortByStandard(restaurants: Restaurant[], sorting: string): Restaurant[];
  updateFavoriteStatus(restaurantName: string): void;
}
