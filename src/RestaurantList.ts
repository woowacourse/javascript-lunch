import Restaurant, { IRestaurant, TCategory } from './Restaurant';

type TRestaurantInstance = InstanceType<typeof Restaurant>;
interface IRestaurantList {
  restaurants: TRestaurantInstance[];
}

class RestaurantList {
  restaurants;
  constructor({ restaurants }: IRestaurantList) {
    this.restaurants = restaurants;
  }

  add(restaurant: TRestaurantInstance): void {
    this.restaurants.push(restaurant);
  }

  filterByCategory(category: TCategory): TRestaurantInstance[] {
    return this.restaurants.filter(restaurant => restaurant.isMatchedCategory(category));
  }
}
export default RestaurantList;
