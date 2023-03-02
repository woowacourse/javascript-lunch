import Category from './Category';

interface RestaurantProps {
  category: Category;
  name: string;
  distanceByMinutes: number;
  description?: string;
  referenceUrl?: string;
}

class Restaurant {
  #category: Category;

  #name: string;

  #distanceByMinutes: number;

  #description?: string;

  #referenceUrl?: string;

  constructor({ category, name, distanceByMinutes, description, referenceUrl }: RestaurantProps) {
    this.#category = category;
    this.#name = name;
    this.#distanceByMinutes = distanceByMinutes;
    this.#description = description;
    this.#referenceUrl = referenceUrl;
  }

  isMatchCategory(searchCategory: string) {
    return this.#category.getName() === searchCategory;
  }

  getName() {
    return this.#name;
  }

  getDistanceByMinutes() {
    return this.#distanceByMinutes;
  }
}

export default Restaurant;
