import ERROR_MASSAGE from "../constants/errorMessage.js";
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

  constructor({ id, name, distance, description = "", link = "", category, isWish }: Restaurant) {
    this.validateCategory(category);
    this.validateDistance(distance);
    this.validateName(name);

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
      isWish: this.isWish
    };
  }

  getId(): string {
    return this.id;
  }

  toggleIsWish(): void {
    this.isWish = !this.isWish;
  }

  isValidateOption(value: string | number): boolean {
    return !value;
  }

  isValidateName(name: string): boolean {
    const NAME_LENGTH_MIN = 2;
    return name.length < NAME_LENGTH_MIN;
  }

  validateCategory(category: string): void {
    if (this.isValidateOption(category)) throw Error(ERROR_MASSAGE.category);
  }

  validateDistance(distance: number): void {
    if (this.isValidateOption(distance)) throw Error(ERROR_MASSAGE.distance);
  }

  validateName(name: string): void {
    if (this.isValidateName(name)) throw Error(ERROR_MASSAGE.name);
  }
}
