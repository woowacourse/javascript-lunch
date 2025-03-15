import ERROR_MASSAGE from "../constants/errorMessage.js";

const CATEGORY_IMAGE = Object.freeze({
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
});

export default class RestaurantData {
  id;
  src;
  alt;
  name;
  distance;
  description;
  link;
  category;
  isWish;

  constructor({ id, name, distance, description = "", link = "", category, isWish}) {
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

  getData() {
    return {
      id: this.id,
      alt: this.alt,
      src: this.src,
      name: this.name,
      distance: this.distance,
      description: this.description,
      link: this.link,
      category: this.category,
      isWish: this.isWish
    };
  }

  getId() {
    return this.id;
  }
  
  toggleIsWish() {
    this.isWish = !this.isWish;
  }
  
  isValidateOption(value) {
    return !value;
  }

  isValidateName(name) {
    const NAME_LENGTH_MIN = 2;
    return name.length < NAME_LENGTH_MIN;
  }

  validateCategory(category) {
    if (this.isValidateOption(category)) throw Error(ERROR_MASSAGE.category);
  }

  validateDistance(distance) {
    if (this.isValidateOption(distance)) throw Error(ERROR_MASSAGE.distance);
  }

  validateName(name) {
    if (this.isValidateName(name)) throw Error(ERROR_MASSAGE.name);
  }
}
