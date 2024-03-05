import { Icategory, Irestaurant, IrestaurantList } from "../types";
import Restaurant from "./Restaurant";

class RestaurantList implements IrestaurantList {
  #restaurantList!: Irestaurant[];

  constructor() {
    // 가상의 레스토랑 객체
    var restaurant1 = {
      category: "음식점 카테고리",
      name: "음식점 이름",
      distance: 5,
      description: "음식점 설명",
      link: "음식점 링크",
    };
    var restaurant2 = {
      category: "음식점 카테고리2",
      name: "음식점 이름2",
      distance: 10,
      description: "음식점 설명2",
      link: "음식점 링크2",
    };

    const list = [];
    list.push(restaurant1);
    list.push(restaurant2);

    // 로컬 스토리지에 객체 저장
    localStorage.setItem("restaurantInfo", JSON.stringify(list));

    const localStorageTest = localStorage.getItem("restaurantInfo");
    if (localStorageTest) {
      this.#restaurantList = JSON.parse(localStorageTest);
      console.log(this.#restaurantList);
    }

    this.addRestaurant({
      category: "한식",
      name: "음식점 이름3",
      distance: 20,
      link: "음식점 링크3",
    });

    const localStorageTest2 = localStorage.getItem("restaurantInfo");
    if (localStorageTest2) {
      this.#restaurantList = JSON.parse(localStorageTest2);
      console.log("after", this.#restaurantList);
    }
  }

  addRestaurant(restaurant: Irestaurant) {
    this.#restaurantList.push(Restaurant(restaurant));
    console.log(this.#restaurantList);
    localStorage.setItem(
      "restaurantInfo",
      JSON.stringify(this.#restaurantList),
    );
  }

  sortByName() {
    return this.#restaurantList.sort();
  }

  sortByDistance() {
    return this.#restaurantList.sort((a, b) => a.distance - b.distance);
  }

  filterByCategory(category: Icategory) {
    return this.#restaurantList.filter(
      (restaurant) => restaurant.category === category,
    );
  }
}

export default RestaurantList;
