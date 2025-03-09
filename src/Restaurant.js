import { validateDescription } from './validation/validateDescription';
import { validateLink } from './validation/validateLink';
import { validateName } from './validation/validateName';

class Restaurant {
  #name;
  #distance;
  #description;
  #category;
  #link;

  constructor(name, distance, description, category, link) {
    validateName(name);
    validateDescription(description);
    validateLink(link);
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
    this.#category = category;
    this.#link = link;
  }

  getName() {
    return String(this.#name);
  }

  getDistance() {
    return String(this.#distance);
  }

  getDescription() {
    return String(this.#description);
  }

  getCategory() {
    return String(this.#category);
  }

  getLink() {
    return String(this.#link);
  }
}

export default Restaurant;
