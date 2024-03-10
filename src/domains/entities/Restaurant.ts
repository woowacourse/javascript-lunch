import { Category, IRestaurant, DistanceNumeric } from '../../types/Restaurant';

class Restaurant implements IRestaurant {
  name: string;
  distance: DistanceNumeric;
  category: Category;
  description?: string;
  link?: string;

  constructor(restaurantArgs: IRestaurant) {
    this.name = restaurantArgs.name;
    this.distance = restaurantArgs.distance;
    this.category = restaurantArgs.category;
    this.description = restaurantArgs.description;
    this.link = restaurantArgs.link;
    this.#validateName();
    this.#validateDescription();
  }

  get() {
    const result: IRestaurant = {
      name: this.name,
      distance: this.distance,
      category: this.category,
    };
    if (this.description) {
      result.description = this.description;
    }
    if (this.link) {
      result.link = this.link;
    }
    return result;
  }

  #validateName() {
    if (!this.name.length || this.name.length > 20) {
      throw new Error('[ERROR] 이름의 길이는 1~20자 여야 합니다.');
    }
  }
  #validateDescription() {
    if (this.description && this.description.length > 500) {
      throw new Error('[ERROR] 음식점 설명 길이는 500자를 초과할 수 없습니다.');
    }
  }
}
export default Restaurant;
