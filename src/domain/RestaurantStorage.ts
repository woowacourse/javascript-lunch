import { DummyData } from './DummyData';
import Restaurant, { RestaurantProps, Distance, Category } from './Restaurant';
import Restaurants from './Restaurants';

const RESTAURANT_STORAGE_ERROR = Object.freeze({
  FAILED_LOAD_FROM_LOCAL_STORAGE: '음식점 리스트 데이터를 불러오는데 실패하였습니다.',
  FAILED_TO_SAVE_RESTAURANT: '음식점을 추가에 실패하였습니다.',
  FAILED_TO_DELET_RESTAURANT: '음식점을 삭제하는데 실패하였습니다.',
  FAILED_TO_UPDATE_IS_LIKE: '음식점의 즐겨찾기를 업데이트할 수 없습니다.',
});

class RestaurantStorage {
  static #STORAGE_KEY = 'restaurants';

  static getRestaurants(): Restaurants {
    const storedData = localStorage.getItem(this.#STORAGE_KEY);

    if (!storedData) {
      const restaurants = new Restaurants(DummyData);
      this.saveRestaurants(restaurants);
      return restaurants;
    }

    try {
      const parsedData: RestaurantProps[] = JSON.parse(storedData);

      const restaurantList = parsedData.map(
        (item) =>
          new Restaurant({
            name: item.name,
            distance: Number(item.distance) as Distance,
            description: item.description,
            category: item.category as Category,
            link: item.link,
            isLike: item.isLike,
          }),
      );
      return new Restaurants(restaurantList);
    } catch (error: any) {
      throw new Error(RESTAURANT_STORAGE_ERROR.FAILED_LOAD_FROM_LOCAL_STORAGE);
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

  static addRestaurant(restaurant: Restaurant): Restaurants {
    const restaurants = this.getRestaurants();

    if (restaurants instanceof Restaurants) {
      restaurants.add(restaurant);
      this.saveRestaurants(restaurants);
      return restaurants;
    } else {
      throw new Error(RESTAURANT_STORAGE_ERROR.FAILED_TO_SAVE_RESTAURANT);
    }
  }

  static deleteRestaurant(restaurantName: string): Restaurants {
    const restaurants = this.getRestaurants();

    if (restaurants instanceof Restaurants) {
      restaurants.delete(restaurantName);
      this.saveRestaurants(restaurants);
      return restaurants;
    } else {
      throw new Error(RESTAURANT_STORAGE_ERROR.FAILED_TO_DELET_RESTAURANT);
    }
  }

  static updateRestaurantIsLike(restaurantName: string, isLike: boolean): Restaurants {
    const restaurants = this.getRestaurants();

    if (restaurants instanceof Restaurants) {
      restaurants.updateIsLike(restaurantName, isLike);
      this.saveRestaurants(restaurants);
      return restaurants;
    } else {
      throw new Error(RESTAURANT_STORAGE_ERROR.FAILED_TO_UPDATE_IS_LIKE);
    }
  }
}

export default RestaurantStorage;
