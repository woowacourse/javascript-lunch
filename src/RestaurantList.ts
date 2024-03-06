import type Restaurant from './Restaurant';
import type { TCategory } from './Restaurant';

type TRestaurantInstance = InstanceType<typeof Restaurant>;
export type IRestaurantList = TRestaurantInstance[];

class RestaurantList {
  restaurants;
  constructor(restaurants: IRestaurantList) {
    this.restaurants = restaurants;
  }

  getSortedByName(): IRestaurantList {
    return [...this.restaurants].sort((a, b) => (a.information.name > b.information.name ? 1 : -1));
  }

  getSortedByDistance(): IRestaurantList {
    return [...this.restaurants].sort((a, b) => (a.information.distance > b.information.distance ? 1 : -1));
  }

  add(restaurant: TRestaurantInstance): void {
    this.restaurants.push(restaurant);
    localStorage.setItem('restaurants', JSON.stringify(this.restaurants));
  }

  filterByCategory(category: TCategory): IRestaurantList {
    return this.restaurants.filter(restaurant => restaurant.isMatchedCategory(category));
  }
}
export default RestaurantList;
