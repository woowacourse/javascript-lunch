import RestaurantType from "../type/Restaurant";
import Restaurant from "./model/Restaurant";

class Controller {
  #restaurants: Restaurant[];

  constructor() {
    this.#restaurants = [];
    this.loadLocalStorage();
  }

  getRestaurants() {
    console.log("식당 부르기");
    return this.#restaurants;
  }

  addRestaurant(newRestaurant: RestaurantType) {
    // 컨트롤러 배열에 저장 (임시)
    this.#restaurants.push(new Restaurant(newRestaurant));
  }

  renderRestaurantList() {
    // 재렌더링 요청
    const restaurantList: any = document.getElementById("restaurantList");
    restaurantList?.render();
  }

  updateRestaurantList(restaurants: RestaurantType[]) {
    // localStorage에 저장
    this.setLocalStorage(restaurants);
    // 재렌더링 요청
    this.renderRestaurantList();
  }

  setLocalStorage(restaurantsArray: RestaurantType[]) {
    const restaurants = JSON.stringify(restaurantsArray);
    localStorage.setItem("restaurants", restaurants);
  }

  loadLocalStorage() {
    this.#restaurants = this.getLocalStorage();
  }

  getLocalStorage() {
    return JSON.parse(localStorage.getItem("restaurants") as string) ?? [];
  }

  sortRestaurants(key: string) {
    // 리팩토링 필요
    if (key === "name") {
      const sortedRestaurants = [...this.#restaurants].sort((a, b) =>
        a["name"].localeCompare(b["name"])
      );
      this.#restaurants = sortedRestaurants;
      return;
    }

    const sortedRestaurants = [...this.#restaurants].sort(
      (a, b) => a["distance"] - b["distance"]
    );
    this.#restaurants = sortedRestaurants;
  }

  filterRestaurants(key: string) {
    if (key !== "전체") {
      this.#restaurants = this.getLocalStorage().filter(
        (restaurant: any) => restaurant["category"] === key
      );
      return;
    }
    this.loadLocalStorage();
  }
}

export default Controller;
