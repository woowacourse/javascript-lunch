import RESTAURANT from "../constants/restaurant";
import { validateInRange } from "../utils/validator";

interface RestaurantProps {
  name: string;
  category: Category;
  timeToReach: Minute;
  description: string;
  link: string;
}

type Category = "한식" | "중식" | "일식" | "아시안" | "디저트";
type Minute = number;

class Restaurant {
  #name: string;
  #timeToReach: Minute;
  #description: string;
  #category: Category;
  #link: string;

  constructor({
    name,
    category,
    timeToReach,
    description,
    link,
  }: RestaurantProps) {
    this.#validateProps({
      name,
      category,
      timeToReach,
      description,
      link,
    });

    this.#name = name;
    this.#category = category;
    this.#timeToReach = timeToReach;
    this.#description = description;
    this.#link = link;
  }

  getRestauarntInfo(): RestaurantProps {
    return {
      name: this.#name,
      category: this.#category,
      timeToReach: this.#timeToReach,
      description: this.#description,
      link: this.#link,
    };
  }

  #validateProps({
    name,
    category,
    timeToReach,
    description,
    link,
  }: RestaurantProps): void {
    this.#validateName(name);
    this.#validateCategory(category);
    this.#validateTimeToReach(timeToReach);
    this.#validateDescription(description);
    this.#validateLink(link);
  }

  #validateName(name: string): void {
    validateInRange(
      RESTAURANT.minNameLength,
      RESTAURANT.maxNameLength,
      name.length
    );
  }

  #validateCategory(category: string): void {
    validateInRange(
      RESTAURANT.minCategoryLength,
      RESTAURANT.maxCategoryLength,
      category.length
    );
  }

  #validateTimeToReach(timeToReach: Minute): void {
    validateInRange(
      RESTAURANT.minTimeToReach,
      RESTAURANT.maxTimeToReach,
      timeToReach
    );
  }

  #validateDescription(description: string): void {
    validateInRange(
      RESTAURANT.minDescriptionLength,
      RESTAURANT.maxDescriptionLength,
      description.length
    );
  }

  #validateLink(link: string): void {
    validateInRange(
      RESTAURANT.minLinkLength,
      RESTAURANT.maxLinkLength,
      link.length
    );
  }
}

export default Restaurant;
