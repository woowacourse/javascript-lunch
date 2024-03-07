interface RestaurantsInterface {
  filterByCategory: (category: Category) => Restaurant[];
  orderByDistance: (restaurants: Restaurant[]) => Restaurant[];
  orderByName: (restaurants: Restaurant[]) => Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
}
