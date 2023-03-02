import RestaurantType from "../../type/Restaurant";

class Restaurant implements RestaurantType {
  category: string;
  name: string;
  distance: number;
  description?: string | undefined;
  link?: string | undefined;

  constructor(newRestaurant: RestaurantType) {
    this.category = newRestaurant.category;
    this.name = newRestaurant.name;
    this.distance = newRestaurant.distance;
    this.description = newRestaurant.description;
    this.link = newRestaurant.link;
  }
}
export default Restaurant;
