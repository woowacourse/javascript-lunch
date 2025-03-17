import { validateDescription } from '../validation/validateDescription';
import { validateLink } from '../validation/validateLink';
import { validateName } from '../validation/validateName';

type Category = 'korean' | 'japanese' | 'chinese' | 'western' | 'asian' | 'etc';
type Distance = 5 | 10 | 15 | 20 | 30;

interface RestaurantProps {
  name: string;
  distance: Distance;
  category: Category;
  description: string;
  link: string;
  isLike: boolean;
}

class Restaurant {
  #name: string;
  #distance: Distance;
  #description: string;
  #category: Category;
  #link: string;
  #isLike: boolean;

  constructor({ name, distance, description, category, link, isLike }: RestaurantProps) {
    validateName(name);
    validateDescription(description);
    validateLink(link);

    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#category = category;
    this.#link = link;
    this.#isLike = isLike;
  }

  getName(): string {
    return String(this.#name);
  }

  getDistance(): string {
    return String(this.#distance);
  }

  getDescription(): string {
    return String(this.#description);
  }

  getCategory(): string {
    return String(this.#category);
  }

  getLink(): string {
    return String(this.#link);
  }

  getIsLike(): boolean {
    return this.#isLike;
  }

  setIsLike(isLike: boolean) {
    this.#isLike = isLike;
  }
}

export default Restaurant;
export type { Distance, Category, RestaurantProps };
