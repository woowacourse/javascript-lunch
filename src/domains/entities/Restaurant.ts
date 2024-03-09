import { Category, IRestaurant, Distance } from '../../types/Restaurant';

class Restaurant implements IRestaurant {
  name: string;
  distance: Distance;
  category: Category;
  description?: string;
  link?: string;

  constructor(restaurantArgs: IRestaurant) {
    this.name = restaurantArgs.name;
    this.distance = restaurantArgs.distance;
    this.category = restaurantArgs.category;
    this.description = restaurantArgs.description;
    this.link = restaurantArgs.link;
  }

  get() {
    const result: IRestaurant = {
      name: this.name,
      distance: this.distance,
      category: this.category,
    };
    if (this.description) {
      result.description = this.description;
    }
    if (this.link) {
      result.link = this.link;
    }
    return result;
  }
}
export default Restaurant;
