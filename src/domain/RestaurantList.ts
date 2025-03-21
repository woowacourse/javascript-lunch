import { RestaurantProp, Values } from "../../types/types.ts";
import Restaurant from "./Restaurant.ts";
import { postData, getAllData } from "../util/dataRepository.ts";

export const VIEW_STATE = {
  all: "모든 음식점",
  favorite: "자주 가는 음식점",
} as const;

export class RestaurantList {
  private dataList: RestaurantProp[];

  constructor() {
    const restaurantDataList = getAllData();

    this.dataList = restaurantDataList.map((restaurantData: RestaurantProp) =>
      new Restaurant(restaurantData).getData()
    );
  }

  getDataList() {
    return this.dataList;
  }

  getFavoriteRestaurantList() {
    const favoriteList = this.dataList.filter(
      (restaurantData: RestaurantProp) => restaurantData.isFavorite
    );

    return favoriteList;
  }

  getRestaurantById(id: number | string) {
    return this.dataList.find(
      (restaurantData: RestaurantProp) => restaurantData.id === id
    );
  }

  addRestaurant(data: RestaurantProp) {
    const restaurantData = new Restaurant(data);
    this.dataList.push(restaurantData.getData());

    postData(this.dataList);
  }

  toggleFavorite(id: number | string) {
    const targetData = this.dataList.find(
      (restaurantData) => restaurantData.id === id
    );
    if (targetData) {
      targetData.isFavorite = !targetData?.isFavorite;
      postData(this.dataList);
    }
  }

  removeRestaurant(id: number | string) {
    this.dataList = this.dataList.filter((restaurant) => restaurant.id !== id);

    postData(this.dataList);
  }
}

const restaurantDataList = new RestaurantList();
export default restaurantDataList;
