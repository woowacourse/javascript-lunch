interface FavoriteRestaurantList {
  add(restaurantId: number): void;
  has(restaurantId: number): void;
  delete(restaurantId: number): void;
  getIdList(): number[];
}

class FavoriteRestaurantList implements FavoriteRestaurantList {
  private favoriteRestaurantList: Set<number>;

  constructor(idList: number[]) {
    this.favoriteRestaurantList = new Set([...idList]);
  }

  add(restaurantId: number) {
    if (this.favoriteRestaurantList.has(restaurantId))
      throw new Error('이미 즐겨찾기 한 음식점입니다.');

    this.favoriteRestaurantList.add(restaurantId);
  }

  has(restaurantId: number) {
    return this.favoriteRestaurantList.has(restaurantId);
  }

  delete(restaurantId: number): void {
    if (!this.favoriteRestaurantList.has(restaurantId))
      throw new Error('즐겨찾는 음식점 목록에 없는 음식점은 지울 수 없습니다.');

    this.favoriteRestaurantList.delete(restaurantId);
  }

  getIdList(): number[] {
    return [...this.favoriteRestaurantList];
  }
}

export default FavoriteRestaurantList;
