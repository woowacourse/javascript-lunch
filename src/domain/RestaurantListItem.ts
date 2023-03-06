import RestaurantStorage from "./RestaurantStorage";

export type TCategory = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

export type TPriority = "distance" | "name";

export type TDistance = 5 | 10 | 15 | 20 | 30;

export interface IRestaurant {
  category: TCategory;
  name: string;
  distance: TDistance;
  description?: string;
  link?: string;
}

class RestaurantListItem {
  #list: IRestaurant[] = [];

  constructor(restaurantList: IRestaurant[]) {
    this.#list = restaurantList;
  }

  add(restaurant: IRestaurant) {
    RestaurantStorage.set([restaurant, ...this.#list]);
    this.#list = RestaurantStorage.get();
    return this.#list;
  }

  categoryFilter(category: TCategory | "전체") {
    if (category === "전체") return this.#list;

    return this.#list.filter((item) => item.category === category);
  }

  sortFilter(priority: TPriority) {
    if (priority === "distance") {
      return this.#list.sort((current, next) => {
        return current.distance - next.distance;
      });
    }

    return this.#list.sort((current, next) => {
      return current.name > next.name ? 1 : -1;
    });
  }

  getListItem() {
    return this.#list;
  }
}

export default RestaurantListItem;
