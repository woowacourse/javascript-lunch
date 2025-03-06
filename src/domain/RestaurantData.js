import categoryImage from "../constants/categoryImage";

export default class RestaurantData {
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

    this.#id = id && crypto.randomUUID();
    this.#src = categoryImage[category];
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
    return value === "선택해 주세요";
  }

  isValidateName(name) {
    return name.length < 2;
  }

  validateCategory(category) {
    if (this.isValidateOption(category))
      throw Error("카테고리를 선택해 주세요");
  }

  validateDistance(distance) {
    if (this.isValidateOption(distance)) throw Error("거리를 선택해 주세요");
  }

  validateName(name) {
    if (this.isValidateName(name))
      throw Error("식당 이름은 2글자 이상 입력해 주세요");
  }
}
