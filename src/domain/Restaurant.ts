import { CATEGORY } from "../constants/category";
import RESTAURANT from "../constants/restaurant";
import { validateInRange, validateNumberBelow } from "../utils/validator";

export interface RestaurantInfo {
  name: string;
  category: Category;
  timeToReach: Minute;
  description: string;
  link: string;
}

type Category = "korean" | "chinese" | "japanese" | "asian" | "dessert";
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
  }: RestaurantInfo) {
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

  getName(): string {
    return this.#name;
  }

  getInfo(): RestaurantInfo {
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
  }: RestaurantInfo): void {
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

    if (!Object.keys(CATEGORY).includes(category as Category)) {
      throw new Error("Invalid category");
    }
  }

  #validateTimeToReach(timeToReach: Minute): void {
    validateInRange(
      RESTAURANT.minTimeToReach,
      RESTAURANT.maxTimeToReach,
      timeToReach
    );
  }

  #validateDescription(description: string): void {
    validateNumberBelow(RESTAURANT.maxDescriptionLength, description.length);
  }

  #validateLink(link: string): void {
    validateNumberBelow(RESTAURANT.maxLinkLength, link.length);
  }
}

export default Restaurant;
