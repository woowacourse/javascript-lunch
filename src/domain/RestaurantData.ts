import Validation from "../validation.js";
import ERROR_MESSAGE from "../constants/errorMessage.js";
import Category from "../types/Category.js";
import Restaurant from "../types/Restaurant.js";

const CATEGORY_IMAGE: Readonly<Record<Category, string>> = Object.freeze({
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
});

export default class RestaurantData {
  id: string;
  src: string;
  alt: string;
  name: string;
  distance: number;
  description: string;
  link: string;
  category: Category;
  isWish: boolean;

  constructor({
    id,
    name,
    distance,
    description = "",
    link = "",
    category,
    isWish,
  }: Restaurant) {
    this.#validateCategory(category);
    this.#validateDistance(distance);
    this.#validateName(name);

    this.id = id || crypto.randomUUID();
    this.src = CATEGORY_IMAGE[category];
    this.alt = category;
    this.name = name;
    this.distance = Number(distance);
    this.description = description;
    this.link = link;
    this.category = category;
    this.isWish = isWish;
  }

  getData(): Restaurant {
    return {
      id: this.id,
      src: this.src,
      alt: this.alt,
      name: this.name,
      distance: this.distance,
      description: this.description,
      link: this.link,
      category: this.category,
      isWish: this.isWish,
    };
  }

  getId(): string {
    return this.id;
  }

  toggleIsWish(): void {
    this.isWish = !this.isWish;
  }

  #validateCategory(category: string): void {
    if (!Validation.isValidateOption(category))
      throw Error(ERROR_MESSAGE.category);
  }

  #validateDistance(distance: number): void {
    if (!Validation.isValidateOption(distance))
      throw Error(ERROR_MESSAGE.distance);
  }

  #validateName(name: string): void {
    if (!Validation.isValidateName(name)) throw Error(ERROR_MESSAGE.name);
  }
}
