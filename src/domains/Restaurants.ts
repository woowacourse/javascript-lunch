class Restaurants implements RestaurantsInterface {
  private restaurants: Restaurant[];

  constructor() {
    this.restaurants = [];
  }

  filterByCategory(category: Category) {
    return this.restaurants.filter((restaurant) => restaurant.category === category);
  }

  addRestaurant(restaurant: Restaurant) {
    // TODO: 이 값이 있는지 없는지 -> set 고려

    this.restaurants.push(restaurant);
  }

  orderByDistance() {
    return this.restaurants.toSorted((prevRestaurant, nextRestaurant) => {
      if (prevRestaurant.walkingTimeFromCampus < nextRestaurant.walkingTimeFromCampus) {
        return -1;
      } else if (prevRestaurant.walkingTimeFromCampus === nextRestaurant.walkingTimeFromCampus) {
        if (prevRestaurant.name < nextRestaurant.name) {
          return -1;
        }
      }
      return 1;
    });
  }
}

export default Restaurants;
