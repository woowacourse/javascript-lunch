import Restaurants from "../domain/Restaurants";
import { CategoryOption, SortOption } from "../types/option";
import { Restaurant } from "../types/restaurant";

const mockList: Restaurant[] = [
  {
    category: "아시안",
    name: "쌀국수맛있다",
    distance: 20,
  },
  {
    category: "일식",
    name: "스시야좋아",
    distance: 30,
  },
  //  {
  //    category: "한식",
  //    name: "경주 은희네 해장국",
  //    distance: 10,
  //  },
];

class RestaurantState {
  #localStorageId: string;

  #restaurants: Restaurants;

  constructor() {
    this.#localStorageId = "lunch-restaurants";

    const list: Restaurant[] = mockList;
    //JSON.parse(
    //  localStorage.getItem(this.#localStorageId)
    //) ?? mockList;
    this.#restaurants = new Restaurants(list);
  }

  getListByOption(filter: CategoryOption, sort: SortOption) {
    return this.#restaurants.getListByOption({ filter, sort });
  }

  update(restaurant: Restaurant) {
    this.#restaurants.add(restaurant);
    localStorage.setItem(
      this.#localStorageId,
      JSON.stringify(this.getListByOption("전체", "name"))
    );
  }
}

const restaurantState = new RestaurantState();

export default restaurantState;
