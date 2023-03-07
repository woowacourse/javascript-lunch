import RestaurantList from ".";
import Storage from "../../tools/Storage";
import IRestaurant from "../../type/IRestaurant";

export const renderRestaurantList = () => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    restaurantList.render();
  }
};

export const addRestaurant = (newRestaurant: IRestaurant) => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    restaurantList.listState.restaurants = [
      ...restaurantList.listState.restaurants,
      newRestaurant,
    ];
    Storage.saveRestaurants(restaurantList.listState.restaurants);
  }
};

export const selectRestaurants = (): IRestaurant[] => {
  const restaurantList = document.getElementById("restaurantList");
  if (restaurantList instanceof RestaurantList) {
    const { filter, sort } = restaurantList.listState;
    const restaurants =
      filter === "all"
        ? restaurantList.listState.restaurants
        : restaurantList.listState.restaurants.filter(
            (restaurant) => restaurant.category === filter
          );
    return restaurants.sort((a, b) => {
      if (sort === "name" || sort === "distance") {
        return a[sort] > b[sort] ? 1 : -1;
      }
      return 0;
    });
  }
  return [];
};
