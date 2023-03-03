import categoryKorean from "../../templates/category-korean.png";
import categoryAsian from "../../templates/category-asian.png";
import categoryChinese from "../../templates/category-chinese.png";
import categoryEtc from "../../templates/category-etc.png";
import categoryJapenese from "../../templates/category-japenese.png";
import categoryWestern from "../../templates/category-western.png";

const category = {
  한식: categoryKorean,
  중식: categoryChinese,
  일식: categoryJapenese,
  양식: categoryWestern,
  아시안: categoryAsian,
  기타: categoryEtc,
};

export interface RestaurantType {
  category: "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
  name: string;
  distance: 5 | 10 | 15 | 20 | 30;
  description?: string;
  link?: string;
}

export class Restaurant {
  #restaurant;

  constructor(restaurant: RestaurantType) {
    this.#restaurant = restaurant;
  }

  template() {
    return `<li class="restaurant">
    <div class="restaurant__category">
      <img src="${category[this.#restaurant.category]}" alt="${
      this.#restaurant.category
    }" class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${this.#restaurant.name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${
        this.#restaurant.distance
      }분 내</span>
      <p class="restaurant__description text-body">${
        this.#restaurant?.description
      }</p>
    </div>
  </li>`;
  }

  setEvent() {
    const restaurant = document.querySelector(".restaurant");
    restaurant?.addEventListener("click", () => {
      if (this.#restaurant.link) {
        location.href = this.#restaurant.link;
      }
    });
  }

  getRestaurant() {
    return this.#restaurant;
  }
}
