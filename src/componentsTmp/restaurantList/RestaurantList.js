import RestaurantListManager from "../../domain/RestaurantListManager";
import RestaurantItem from "./RestaurantItem";

const dummyData = [
  {
    name: "라식당",
    category: "한식",
    distance: 5,
    description: "라식당입니다.",
  },
  {
    name: "다식당",
    category: "일식",
    distance: 10,
    description: "다식당입니다.",
  },
  {
    name: "나식당",
    category: "아시안",
    distance: 20,
    description: "나식당입니다.",
  },
  {
    name: "가식당",
    category: "아시안",
    distance: 20,
    description: "가식당입니다.",
  },
];

class RestaurantList {
  $target;
  restaurantListManager;

  constructor($target) {
    this.$target = $target;
    this.restaurantListManager = new RestaurantListManager(dummyData);
    this.render(this.restaurantListManager.getRestaurantList());
  }

  template() {
    return `
      <ul class="restaurant-list">
      </ul>
    `;
  }

  render(restaurantList) {
    this.$target.innerHTML = this.template();
    const $restaurantList = this.$target.querySelector(".restaurant-list");

    restaurantList.forEach((restaurantInfo) => {
      new RestaurantItem($restaurantList, restaurantInfo);
    });
  }

  renderFilteredList(category, sortingWay) {
    const filteredList = this.restaurantListManager.getRestaurantList(category, sortingWay);

    this.render(filteredList);
  }
}

export default RestaurantList;
