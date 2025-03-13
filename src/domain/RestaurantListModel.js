export default class RestaurantListModel {
  #restaurantList;

  constructor() {
    const dummy = [
      {
        category: "한식",
        name: "얌샘김밥",
        distance: 5,
        description: "김밥집",
        link: "http://localhost:5174/",
        bookmark: false,
      },
      {
        category: "중식",
        name: "친친",
        distance: 5,
        description: "가지덮밥",
        link: "http://localhost:5174/",
        bookmark: true,
      },
    ];
    this.#restaurantList = dummy;
  }

  updateRestautantList(newRestaurantList) {
    this.#restaurantList = [...newRestaurantList];
  }

  getRestaurantList() {
    return this.#restaurantList;
  }
}
