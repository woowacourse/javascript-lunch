import { RestaurantType } from "../Template";
import { LocalData } from "../until/LocalData";

interface RestaurantDataType {
  allList: RestaurantType[];
  likeList: RestaurantType[];

  settingList: () => void;
  addRestaurant: (restaurant: RestaurantType) => void;
  turnLikeUnlike: (id: number) => void;
  deleteLikeRestaurant: (id: number) => void;
  addLikeRestaurant: (id: number) => void;
}

export const RestaurantData: RestaurantDataType = {
  allList: [],
  likeList: [],

  settingList() {
    const isLocalData = LocalData.getData();
    if (isLocalData) {
      this.allList = isLocalData;
      this.likeList = this.allList.filter((res) => res.like);
    }
    LocalData.setDate(this.allList);
    return;
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
  },

  deleteLikeRestaurant(id) {
    this.likeList = this.likeList.filter((res) => {
      return res.id !== id && res;
    });
    LocalData.setDate(this.allList);
  },

  addLikeRestaurant(id) {
    const likeRestaurant = this.allList.filter((res) => {
      return res.id === id && res;
    });
    this.likeList = [...this.likeList, ...likeRestaurant];
    LocalData.setDate(this.allList);
  },
};
