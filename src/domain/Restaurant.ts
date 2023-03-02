import Validation from './Validation';

interface RestaurantProps {
  category: string;
  name: string;
  distanceByMinutes: number;
  description?: string;
  referenceUrl?: string;
}

class Restaurant {
  #category: string;

  #name: string;

  #distanceByMinutes: number;

  #description?: string;

  #referenceUrl?: string;

  constructor({ category, name, distanceByMinutes, description, referenceUrl }: RestaurantProps) {
    this.validate(name);

    this.#category = category;
    this.#name = name;
    this.#distanceByMinutes = distanceByMinutes;
    this.#description = description;
    this.#referenceUrl = referenceUrl;
  }

  isMatchCategory(searchCategory: string) {
    return this.#category === searchCategory;
  }

  getName() {
    return this.#name;
  }

  getDistanceByMinutes() {
    return this.#distanceByMinutes;
  }

  getDescription() {
    return this.#description;
  }

  getCategory() {
    return this.#category;
  }

  validate(name: string) {
    Validation.validateRestaurantNameLength(name);
  }
}

export default Restaurant;
