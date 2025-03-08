const CATEGORY_IMAGE = Object.freeze({
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
});

export default class RestaurantData {
  ERROR_MASSAGE = Object.freeze({
    category: "카테고리를 선택해 주세요",
    distance: "거리를 선택해 주세요",
    name: "식당 이름은 2글자 이상 입력해 주세요",
    link: "올바른 링크 주소를 입력해 주세요.",
  });

  #id;
  #src;
  #alt;
  #name;
  #distance;
  #description;
  #link;
  #category;
  constructor({ id, name, distance, description = "", link = "", category }) {
    this.validateCategory(category);
    this.validateDistance(distance);
    this.validateName(name);
    this.validateLink(link);

    this.#id = id || crypto.randomUUID();
    this.#src = CATEGORY_IMAGE[category];
    this.#alt = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#link = link;
    this.#category = category;
  }

  getData() {
    return {
      id: this.#id,
      alt: this.#alt,
      src: this.#src,
      name: this.#name,
      distance: this.#distance,
      description: this.#description,
      link: this.#link,
      category: this.#category,
    };
  }

  isValidateOption(value) {
    return !value;
  }

  isValidateName(name) {
    return name.length < 2;
  }

  isValidateLink(link) {
    return link.trim().length !== 0 && !/^(https?:\/\/)[^\s]+/.test(link);
  }

  validateCategory(category) {
    if (this.isValidateOption(category))
      throw Error(this.ERROR_MASSAGE.category);
  }

  validateDistance(distance) {
    if (this.isValidateOption(distance))
      throw Error(this.ERROR_MASSAGE.distance);
  }

  validateName(name) {
    if (this.isValidateName(name)) throw Error(this.ERROR_MASSAGE.name);
  }

  validateLink(link) {
    if (this.isValidateLink(link)) throw Error(this.ERROR_MASSAGE.link);
  }
}
