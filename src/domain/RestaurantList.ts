import { Icategory, Irestaurant, IrestaurantList } from "../types";
import Restaurant from "./Restaurant";

class RestaurantList implements IrestaurantList {
  #restaurantList!: Irestaurant[];

  constructor() {
    // 가상의 레스토랑 객체
    var restaurant1 = {
      category: "한식",
      name: "피양콩할마니",
      distance: 5,
      description:
        " 평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은건강식을 선보인다. 콩비지와 피양 만두가 이곳의 대표 메뉴지만,할머니가 옛날 방식을 고수하며 만들어내는 비지전골 또한 이 집의역사를 느낄 수 있는 특별한 메뉴다. 반찬은 손님들이 먹고 싶은만큼 덜어 먹을 수 있게 준비돼 있다.",
      link: "음식점 링크",
    };
    var restaurant2 = {
      category: "중식",
      name: "친친",
      distance: 10,
      description:
        "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛과정성으로 정통 중식의 세계를 펼쳐갑니다",
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
      category: "일식",
      name: "잇쇼우",
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
