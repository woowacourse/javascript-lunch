import {
  Category,
  Distance,
  RestaurantItem,
} from "../types/restaurant.types.ts";

const urlRegex = /https?:\/\/[^\s"]/;

export default class Restaurant {
  #id: number;
  #storeName: string;
  #distance: Distance;
  #category: Category;
  #description?: string;
  #link?: string;
  #isFavorite: boolean = false;

  constructor({
    id,
    storeName,
    distance,
    category,
    description = "",
    link = "",
    isFavorite = false,
  }: RestaurantItem) {
    this.#id = id;
    this.#storeName = storeName;
    this.#distance = distance;
    this.#category = category;
    this.#description = description;
    this.#link = link;
    this.#isFavorite = isFavorite;
    this.validate();
  }

  validate(): void {
    if (this.#storeName === "") {
      throw new Error("음식점 이름 입력해주세요.");
    }

    if (!this.#distance) {
      throw new Error("거리를 선택해주세요.");
    }

    if (!this.#category) {
      throw new Error("카테고리를 선택해주세요.");
    }

    if (this.#link && !urlRegex.test(this.#link)) {
      throw new Error("링크 형식이 올바르지 않습니다.");
    }
  }

  get restaurantValue(): RestaurantItem {
    return {
      id: this.#id,
      storeName: this.#storeName,
      distance: this.#distance,
      category: this.#category,
      description: this.#description,
      link: this.#link,
      isFavorite: this.#isFavorite,
    };
  }
}
