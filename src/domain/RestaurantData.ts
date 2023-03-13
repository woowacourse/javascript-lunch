import { RestaurantType } from "../Template";
import { LocalData } from "../until/LocalData";

interface RestaurantDataInterFace {
  allList: RestaurantType[];
  likeList: RestaurantType[];
  nowId: number;

  settingList: (restaurantList: RestaurantType[]) => void;
  addRestaurant: (restaurant: RestaurantType) => void;
  turnLikeUnlike: (id: number) => void;
  deleteLikeRestaurant: (id: number) => void;
  addLikeRestaurant: (id: number) => void;
  getRestaurant: (id: number) => RestaurantType;
  deleteOneRestaurant: (id: number) => void;
  findLastID: () => void;
}

export const RestaurantData: RestaurantDataInterFace = {
  allList: [],
  likeList: [],
  nowId: 0,

  settingList(restaurantList) {
    const isLocalData = LocalData.getData("restaurantList");

    if (isLocalData) {
      this.allList = isLocalData;
      this.likeList = this.allList.filter((res) => res.like);
      this.findLastID();
      return;
    }

    this.allList = restaurantList;
    this.findLastID();
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
        this.deleteLikeRestaurant(id);
      } else {
        this.addLikeRestaurant(id);
      }
      elem.like = !elem.like;
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

  getRestaurant(fineId) {
    return this.allList.find(({ id }) => id === fineId)!;
  },

  deleteOneRestaurant(id) {
    this.allList = this.allList.filter((res) => {
      return res.id !== id && res;
    });
    this.deleteLikeRestaurant(id);
  },

  findLastID() {
    this.nowId =
      this.allList.length === 0 ? 0 : this.allList[this.allList.length - 1].id;
  },
};
