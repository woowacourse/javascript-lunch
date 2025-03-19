import { validateDescription } from '../validation/validateDescription';
import { validateLink } from '../validation/validateLink';
import { validateName } from '../validation/validateName';

type Category = 'korean' | 'japanese' | 'chinese' | 'western' | 'asian' | 'etc';
type Distance = 5 | 10 | 15 | 20 | 30;

interface RestaurantProps {
  name: string;
  distance: Distance;
  category: Category;
  description?: string;
  link?: string;
  isLiked: boolean;
}

class Restaurant {
  #name: string;
  #distance: Distance;
  #description: string;
  #category: Category;
  #link: string;
  #isLiked: boolean;

  constructor({ name, distance, description = '', category, link = '', isLiked }: RestaurantProps) {
    validateName(name);
    validateDescription(description);
    validateLink(link);

    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#category = category;
    this.#link = link;
    this.#isLiked = isLiked;
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

  getIsLiked(): boolean {
    return this.#isLiked;
  }

  setIsLiked(isLiked: boolean) {
    this.#isLiked = isLiked;
  }
}

export default Restaurant;
export type { Distance, Category, RestaurantProps };
