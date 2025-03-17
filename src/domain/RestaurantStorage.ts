import { DummyData } from './DummyData';
import Restaurant, { Category, Distance } from './Restaurant';
import Restaurants from './Restaurants';

class RestaurantStorage {
  static #STORAGE_KEY = 'restaurants';

  static getRestaurants(): Restaurants | [] {
    const storedData = localStorage.getItem(this.#STORAGE_KEY);

    if (!storedData) {
      const restaurants = new Restaurants(DummyData);
      this.saveRestaurants(restaurants);
      return restaurants;
    }

    try {
      const parsedData: {
        name: string;
        distance: Distance;
        description: string;
        category: Category;
        link: string;
        isLike: boolean;
      }[] = JSON.parse(storedData);

      const restaurantList = parsedData.map(
        (item) =>
          new Restaurant({
            name: item.name,
            distance: Number(item.distance) as Distance,
            description: item.description,
            category: item.category,
            link: item.link,
            isLike: item.isLike,
          }),
      );
      return new Restaurants(restaurantList);
    } catch (error: any) {
      alert(error.message);
      return [];
    }
  }

  static saveRestaurants(restaurants: Restaurants): void {
    const restaurantArray = restaurants.getAll();

    const serializableData = restaurantArray.map((restaurant) => ({
      name: restaurant.getName(),
      distance: restaurant.getDistance(),
      description: restaurant.getDescription(),
      category: restaurant.getCategory(),
      link: restaurant.getLink(),
      isLike: restaurant.getIsLike(),
    }));

    localStorage.setItem(this.#STORAGE_KEY, JSON.stringify(serializableData));
  }

  static addRestaurant(restaurant: Restaurant): Restaurants | [] {
    const restaurants = this.getRestaurants();

    if (restaurants instanceof Restaurants) {
      restaurants.add(restaurant);
      this.saveRestaurants(restaurants);
      return restaurants;
    }

    return [];
  }

  static deleteRestaurant(restaurantName: string): Restaurants | [] {
    const restaurants = this.getRestaurants();

    if (restaurants instanceof Restaurants) {
      restaurants.delete(restaurantName);
      this.saveRestaurants(restaurants);
      return restaurants;
    }

    return [];
  }

  static updateRestaurantIsLike(restaurantName: string, isLike: boolean): Restaurants | [] {
    const restaurants = this.getRestaurants();

    if (restaurants instanceof Restaurants) {
      restaurants.updateIsLike(restaurantName, isLike);
      this.saveRestaurants(restaurants);
      return restaurants;
    }

    return [];
  }
}

export default RestaurantStorage;
