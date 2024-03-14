type RestaurantName = string;

interface FavoriteStore {
  get(): RestaurantName[];
  toggle(restaurantName: RestaurantName, isDelete: boolean): void;
  set(restaurantNames: RestaurantName[]): void;
}

export const FAVORITE_RESTAURANT_NAMES = "favoriteRestaurantNames";

const favoriteStore: FavoriteStore = {
  get(): RestaurantName[] {
    const rawNames = localStorage.getItem(FAVORITE_RESTAURANT_NAMES);

    if (!rawNames) {
      return [];
    }

    const parsedNames = JSON.parse(rawNames);
    if (!Array.isArray(parsedNames)) {
      localStorage.removeItem(FAVORITE_RESTAURANT_NAMES);
      alert("데이터가 훼손되어 식당 즐겨찾기 목록이 초기화되었습니다.");
      return [];
    }

    return parsedNames;
  },

  toggle(restaurantName, isDelete): void {
    const restaurantNames = this.get();

    const updatedNames = isDelete
      ? restaurantNames.filter((name) => name !== restaurantName)
      : [...restaurantNames, restaurantName];

    this.set(updatedNames);
  },

  set(RestaurantNames: RestaurantName[]) {
    localStorage.setItem(
      FAVORITE_RESTAURANT_NAMES,
      JSON.stringify(RestaurantNames)
    );
  },
};

export default favoriteStore;
