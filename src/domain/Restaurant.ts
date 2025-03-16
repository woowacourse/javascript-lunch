import { validateDescription } from '../validation/validateDescription.ts';
import { validateLink } from '../validation/validateLink.ts';
import { validateName } from '../validation/validateName.ts';

type Category = 'korean' | 'japanese' | 'chinese' | 'western' | 'asian' | 'etc';
type Distance = 5 | 10 | 15 | 20 | 30;

interface RestaurantProps {
  name: string;
  distance: Distance;
  description: string;
  category: Category;
  link: string;
  like: boolean;
}

class Restaurant {
  #name: string;
  #distance: Distance;
  #description: string;
  #category: Category;
  #link: string;
  #like: boolean;

  constructor({ name, distance, description, category, link, like }: RestaurantProps) {
    validateName(name);
    validateDescription(description);
    validateLink(link);

    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#category = category;
    this.#link = link;
    this.#like = like;
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

  getLike(): boolean {
    return this.#like;
  }

  setLike(like: boolean) {
    this.#like = like;
  }
}

export default Restaurant;
export type { Distance, Category, RestaurantProps };
