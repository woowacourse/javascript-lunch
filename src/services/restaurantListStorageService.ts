import { Irestaurant } from "../types";

const RestaurantListStorageService = {
  getData() {
    const restaurantList = localStorage.getItem("restaurantList");
    if (restaurantList) {
      return JSON.parse(restaurantList);
    }
  },

  setData(restaurantList: Irestaurant[]) {
    // const mergedData = Object.assign({}, this.getData(), { ...restaurantList });
    // console.log("getData: ", this.getData());
    // const prevData = this.getData();

    // console.log("restaurantList: ", restaurantList);
    // prevData.push(restaurantList);
    // const dataFromGet = this.getData() || {};

    // restaurantList와 dataFromGet을 합치기
    // const mergedData = {
    //   ...dataFromGet,
    //   ...restaurantList,
    // };
    // console.log("p", mergedData);
    localStorage.setItem("restaurantList", JSON.stringify(restaurantList));
  },
};

export default RestaurantListStorageService;
