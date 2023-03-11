import { RestaurantType } from "../Template";
import { LocalData } from "../until/LocalData";

interface RestaurantDataInterFace {
  allList: RestaurantType[];
  likeList: RestaurantType[];
  id: number;

  settingList: (restaurantList: RestaurantType[]) => void;
  addRestaurant: (restaurant: RestaurantType) => void;
  turnLikeUnlike: (id: number) => void;
  deleteLikeRestaurant: (id: number) => void;
  addLikeRestaurant: (id: number) => void;
  getRestaurant: (id: number) => RestaurantType;
  deleteOneRestaurant: (id: number) => void;
}

export const RestaurantData: RestaurantDataInterFace = {
  allList: [],
  likeList: [],
  id: 0,

  settingList(restaurantList) {
    const isLocalData = LocalData.getData("restaurantList");

    if (isLocalData) {
      this.allList = isLocalData;
      this.likeList = this.allList.filter((res) => res.like);
      this.id = this.allList.length - 1;
      return;
    }

    this.allList = restaurantList;
    this.id = this.allList.length - 1;
    LocalData.setDate("restaurantList", this.allList);
  },

  addRestaurant(restaurant) {
    this.allList = [restaurant, ...this.allList];
    LocalData.setDate("restaurantList", this.allList);
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
    LocalData.setDate("restaurantList", this.allList);
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
