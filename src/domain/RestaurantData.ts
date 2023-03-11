import { RestaurantType } from "../Template";
import { LocalData } from "../until/LocalData";

interface RestaurantDataType {
  allList: RestaurantType[];
  likeList: RestaurantType[];

  settingList: (restaurantList: RestaurantType[]) => void;
  addRestaurant: (restaurant: RestaurantType) => void;
  turnLikeUnlike: (id: number) => void;
  deleteLikeRestaurant: (id: number) => void;
  addLikeRestaurant: (id: number) => void;
  getRestaurant: (id: number) => RestaurantType;
  deleteOneRestaurant: (id: number) => void;
}

export const RestaurantData: RestaurantDataType = {
  allList: [],
  likeList: [],

  settingList(restaurantList: RestaurantType[]) {
    this.allList = restaurantList;
    const isLocalData = LocalData.getData();

    if (isLocalData) {
      this.allList = isLocalData;
      this.likeList = this.allList.filter((res) => res.like);
    }
    LocalData.setDate(this.allList);
  },

  addRestaurant(restaurant) {
    this.allList = [restaurant, ...this.allList];
    LocalData.setDate(this.allList);
  },

  turnLikeUnlike(id) {
    this.allList.forEach((elem) => {
      if (elem.id !== id) return;
      if (elem.like) {
        elem.like = false;
        this.deleteLikeRestaurant(id);
      } else {
        elem.like = true;
        this.addLikeRestaurant(id);
      }
    });
    LocalData.setDate(this.allList);
  },

  deleteLikeRestaurant(id) {
    this.likeList = this.likeList.filter((res) => {
      return res.id !== id && res;
    });
  },

  addLikeRestaurant(id) {
    const likeRestaurant = this.allList.filter((res) => {
      return res.id === id && res;
    });
    this.likeList = [...this.likeList, ...likeRestaurant];
  },

  getRestaurant(id) {
    return this.allList.filter((res) => {
      return res.id === id && res;
    })[0];
  },

  deleteOneRestaurant(id) {
    this.allList = this.allList.filter((res) => {
      return res.id !== id && res;
    });
    this.deleteLikeRestaurant(id);
  },
};
