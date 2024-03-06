interface RestaurantsInterface {
  filterByCategory: (category: Category) => Restaurant[];
  orderByDistance: () => Restaurant[];
  orderByName: () => Restaurant[];
  addRestaurant: (restaurant: Restaurant) => void;
}
