import { RestaurantProp, CategoryType } from "../../types/types";

const CATEGORY_IMAGE = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
} as const;

export const ERROR_MESSAGE = {
  category: "카테고리를 선택해 주세요",
  distance: "거리를 선택해 주세요",
  nameLength: "식당 이름은 2글자 이상 입력해 주세요",
  nameChar: "올바른 식당 이름을 입력해 주세요.",
  link: "올바른 링크 주소를 입력해 주세요.",
} as const;

export default class Restaurant {
  private id: number | string;
  private src: string;
  private alt: string;
  private name: string;
  private distance: number;
  private description: string;
  private link: string;
  private category: CategoryType;
  private isFavorite: boolean;

  constructor({
    id,
    name,
    distance,
    description = "",
    link = "",
    category,
    isFavorite = false,
    src,
    alt,
  }: RestaurantProp) {
    this.validateCategory(category);
    this.validateDistance(distance);
    this.validateName(name);
    this.validateLink(link);

    this.id = id || crypto.randomUUID();
    this.src = src || CATEGORY_IMAGE[category];
    this.alt = alt || category;
    this.name = name;
    this.distance = distance;
    this.description = description;
    this.link = link;
    this.category = category;
    this.isFavorite = isFavorite;
  }

  getData(): RestaurantProp {
    return {
      id: this.id,
      src: this.src,
      alt: this.alt,
      name: this.name,
      distance: this.distance,
      description: this.description,
      link: this.link,
      category: this.category,
      isFavorite: this.isFavorite,
    };
  }

  private hasInvalidNameChar(name: string): boolean {
    return !/^[가-힣a-zA-Z0-9\s]+$/.test(name);
  }

  private isValidateNameLength(name: string): boolean {
    return name.length < 2;
  }

  private isValidateLink(link: string): boolean {
    return link.trim().length !== 0 && !/^(https?:\/\/)[^\s]+/.test(link);
  }

  private validateCategory(category: CategoryType): void {
    if (!category) throw Error(ERROR_MESSAGE.category);
  }

  private validateDistance(distance: number): void {
    if (!distance) throw Error(ERROR_MESSAGE.distance);
  }

  private validateName(name: string): void {
    if (this.isValidateNameLength(name)) {
      throw Error(ERROR_MESSAGE.nameLength);
    }
    if (this.hasInvalidNameChar(name)) {
      throw Error(ERROR_MESSAGE.nameChar);
    }
  }

  private validateLink(link: string): void {
    if (this.isValidateLink(link)) {
      throw Error(ERROR_MESSAGE.link);
    }
  }
}
