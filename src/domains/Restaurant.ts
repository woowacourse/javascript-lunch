import {
  CATEGORY,
  CHARACTER_LIMIT,
  DISTANCES,
  MESSAGE,
  PROTOCOL,
  STORAGE_KEY,
} from '../constants';
import { Distance, RestaurantInfo } from '../types';

class Restaurant {
  #info!: RestaurantInfo;

  constructor(info: RestaurantInfo) {
    this.#validateInfo(info);
    this.#info = info;
  }

  get info() {
    return JSON.parse(JSON.stringify(this.#info)) as RestaurantInfo;
  }

  #validateInfo(info: RestaurantInfo) {
    //name
    this.#validateStringType(info.name);
    this.#validateNameCharacterLimit(info.name);
    this.#validateNameDuplicate(info.name);

    //category
    this.#validateCategory(info.category);
    //distance
    this.#validateDistance(info.distance);

    if (info.description) {
      this.#validateStringType(info.description);
      this.#validateDescriptionCharacterLimit(info.description);
    }

    if (info.link) {
      this.#validateLinkCharacterLimit(info.link);
      this.#validateLinkUrl(info.link);
    }
  }

  #validateStringType(string: any) {
    if (typeof string !== 'string') {
      throw new Error(MESSAGE.invalidStringType);
    }
  }

  #validateNameCharacterLimit(name: string) {
    if (name.trim().length === 0 || name.length > CHARACTER_LIMIT.name) {
      throw new Error(MESSAGE.nameHasInvalidCharacterLimit);
    }
  }

  #validateNameDuplicate(name: string) {
    const storageRestaurantList = localStorage.getItem(STORAGE_KEY.restaurants);

    if (!storageRestaurantList) return;

    const list = JSON.parse(storageRestaurantList) as RestaurantInfo[];

    if (list.some((info) => info.name === name)) {
      throw new Error(MESSAGE.duplicateRestaurantName);
    }
  }

  #validateCategory(category: string) {
    const categories = Object.keys(CATEGORY);
    const isInvalidCategory = !categories.find((item) => item === category);

    if (isInvalidCategory) {
      throw new Error(MESSAGE.invalidCategoryType);
    }
  }

  #validateDistance(distance: string | number) {
    const isInValidDistance = !DISTANCES.find((item) => item === distance);

    if (isInValidDistance) {
      throw new Error(MESSAGE.invalidDistanceType);
    }
  }

  #validateDescriptionCharacterLimit(description: string) {
    if (
      description.trim().length === 0 ||
      description.length > CHARACTER_LIMIT.description
    ) {
      throw new Error(MESSAGE.descriptionHasInvalidCharacterLimit);
    }
  }

  #validateLinkCharacterLimit(link: string) {
    if (link.length > CHARACTER_LIMIT.link) {
      throw new Error(MESSAGE.linkHasInvalidCharacterLimit);
    }
  }

  #validateLinkUrl(link: string) {
    const regexp = new RegExp('^(https?://)');
    const isInValidLink = !regexp.test(link);

    if (isInValidLink) {
      throw new Error(MESSAGE.linkHasInvalidProtocol);
    }
  }
}

export default Restaurant;
