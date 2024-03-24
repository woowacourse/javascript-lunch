import { StorageInterface } from './interface/Storage';

interface FavoriteRestaurantList {
  addRestaurant(restaurantId: number): void;
  hasRestaurant(restaurantId: number): boolean;
  deleteRestaurant(restaurantId: number): void;
  getIdList(): number[];
  toggleRestaurant(restaurantId: number): void;
}

class FavoriteRestaurantList implements FavoriteRestaurantList {
  private favoriteRestaurantList: Set<number>;
  private storage;

  constructor(idList: string[], storage: StorageInterface) {
    this.favoriteRestaurantList = new Set([...idList.map(Number)]);
    this.storage = storage;
  }

  addRestaurant(restaurantId: number) {
    if (this.favoriteRestaurantList.has(restaurantId))
      throw new Error('이미 즐겨찾기 한 음식점입니다.');

    this.favoriteRestaurantList.add(restaurantId);

    this.storage.set('favoriteRestaurantList', [
      ...this.favoriteRestaurantList,
    ]);
  }

  hasRestaurant = (restaurantId: number): boolean => {
    return this.favoriteRestaurantList.has(restaurantId);
  };

  deleteRestaurant(restaurantId: number): void {
    if (!this.favoriteRestaurantList.has(restaurantId))
      throw new Error('즐겨찾는 음식점 목록에 없는 음식점은 지울 수 없습니다.');

    this.favoriteRestaurantList.delete(restaurantId);

    this.storage.set('favoriteRestaurantList', [
      ...this.favoriteRestaurantList,
    ]);
  }

  getIdList(): number[] {
    return [...this.favoriteRestaurantList];
  }

  toggleRestaurant = (restaurantId: number): void => {
    if (this.hasRestaurant(restaurantId)) this.deleteRestaurant(restaurantId);
    else this.addRestaurant(restaurantId);
  };
}

export default FavoriteRestaurantList;