const RestaurantStorage = {
  setRestaurants(restaurants: IRestaurant[]) {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  },

  getRestaurants(): IRestaurant[] {
    const restaurants = localStorage.getItem('restaurants');
    return restaurants ? JSON.parse(restaurants) : [];
  },
};

export default RestaurantStorage;
