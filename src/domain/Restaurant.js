import { validateDescription } from '../validation/validateDescription.js';
import { validateLink } from '../validation/validateLink.js';
import { validateName } from '../validation/validateName.js';

class Restaurant {
  #name;
  #distance;
  #description;
  #category;
  #link;
  #like;

  constructor(name, distance, description, category, link, like) {
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

  getLike() {
    return this.#like;
  }

  setLike(like) {
    this.#like = like;
  }
}

export default Restaurant;
