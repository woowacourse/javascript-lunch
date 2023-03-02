import { Restaurant, RestaurantType } from "./Restaurant";

class RestaurantList {
  #restaurantList: Restaurant[];

  constructor(restaurantList: RestaurantType[]) {
    this.#restaurantList = restaurantList.map((item) => {
      const restaurant = new Restaurant(item);
      return restaurant;
    });
  }

  addRestaurant(restaurant: RestaurantType) {
    this.#restaurantList.push(new Restaurant(restaurant));
  }

  template() {
    return `<ul class="restaurant-list">
    ${this.#restaurantList.map((restaurant) => restaurant.template()).join("")}
    </ul>`;
  }

  // setEvent() {
  //   const restaurantList = document.querySelector(".restaurant-list");
  //   restaurantList?.addEventListener("click", (event) => {
  //     const component = event.target as HTMLElement;
  //     component.className !== "restuarant" &&  component = component.parentNode?.parentNode ;

  //     console.log(component.parentNode.);
  //   });
  // }

  setEvent() {
    this.#restaurantList.forEach((restaurant) => {
      restaurant.setEvent();
    });
  }
}

export default RestaurantList;
