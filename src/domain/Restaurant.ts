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
  #distanceByMinue: number;
  #description?: string;
  #referenceUrl?: string;

  constructor({ category, name, distanceByMinutes, description, referenceUrl }: RestaurantProps) {
    this.#category = category;
    this.#name = name;
    this.#distanceByMinue = distanceByMinutes;
    this.#description = description;
    this.#referenceUrl = referenceUrl;
  }
}

export default Restaurant;