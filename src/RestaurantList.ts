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

  getSortedByName(): TRestaurantInstance[] {
    return [...this.restaurants].sort((a, b) => (a.information.name > b.information.name ? 1 : -1));
  }

  getSortedByDistance(): TRestaurantInstance[] {
    return [...this.restaurants].sort((a, b) => (a.information.distance > b.information.distance ? 1 : -1));
  }

  add(restaurant: TRestaurantInstance): void {
    this.restaurants.push(restaurant);
  }

  filterByCategory(category: TCategory): TRestaurantInstance[] {
    return this.restaurants.filter(restaurant => restaurant.isMatchedCategory(category));
  }
}
export default RestaurantList;
