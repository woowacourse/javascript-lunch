import {
  CATEGORY,
  CHARACTER_LIMIT,
  DISTANCES,
  MESSAGE,
  STORAGE_KEY,
} from '../constants';
import { RestaurantTextInfoKey, RestaurantInfo } from '../types';

const RestaurantValidator = {
  validateInfo(info: RestaurantInfo) {
    // name
    this.validateTextAboutInfo('name', info.name);
    // category
    this.private_validateCategory(info.category);
    // distance
    this.private_validateDistance(info.distance);

    if (info.description) {
      this.validateTextAboutInfo('description', info.description);
    }

    if (info.link) {
      this.validateTextAboutInfo('link', info.link);
    }
    if (info.favorite) {
      this.private_validateFavorite(info.favorite);
    }
  },

  validateTextAboutInfo(key: RestaurantTextInfoKey, value: string) {
    switch (key) {
      case 'name':
        this.private_validateName(value);
        break;
      case 'description':
        this.private_validateDescription(value);
        break;
      case 'link':
        this.private_validateLink(value);
        break;
      default:
        break;
    }
  },

  private_validateName(name: string | undefined) {
    this.private_validateStringType(name);

    if (typeof name === 'string') {
      this.private_validateNameCharacterLimit(name);
      this.private_validateNameDuplicate(name);
    }
  },

  private_validateDescription(description: string) {
    this.private_validateStringType(description);
    this.private_validateDescriptionCharacterLimit(description);
  },

  private_validateCategory(category: string) {
    const categories = Object.keys(CATEGORY);
    const isInvalidCategory = !categories.find((item) => item === category);

    if (isInvalidCategory) {
      throw new Error(MESSAGE.invalidCategoryType);
    }
  },

  private_validateDistance(distance: string | number) {
    const isInValidDistance = !DISTANCES.find((item) => item === distance);

    if (isInValidDistance) {
      throw new Error(MESSAGE.invalidDistanceType);
    }
  },

  private_validateLink(link: string) {
    this.private_validateLinkCharacterLimit(link);
    this.private_validateLinkUrl(link);
  },

  private_validateFavorite(favorite: boolean) {
    const isInvalidFavorite = typeof favorite !== 'boolean';

    if (isInvalidFavorite) {
      throw new Error(MESSAGE.invalidFavoriteType);
    }
  },

  private_validateStringType(string: string | undefined | null) {
    if (typeof string !== 'string') {
      throw new Error(MESSAGE.invalidStringType);
    }
  },

  private_validateNameCharacterLimit(name: string) {
    if (name.trim().length === 0 || name.length > CHARACTER_LIMIT.name) {
      throw new Error(MESSAGE.nameHasInvalidCharacterLimit);
    }
  },

  private_validateNameDuplicate(name: string) {
    const storageRestaurantList = localStorage.getItem(STORAGE_KEY.restaurants);

    if (!storageRestaurantList) return;

    const list = JSON.parse(storageRestaurantList) as RestaurantInfo[];

    if (list.some((info) => info.name === name)) {
      throw new Error(MESSAGE.duplicateRestaurantName);
    }
  },

  private_validateDescriptionCharacterLimit(description: string) {
    if (
      description.trim().length === 0 ||
      description.length > CHARACTER_LIMIT.description
    ) {
      throw new Error(MESSAGE.descriptionHasInvalidCharacterLimit);
    }
  },

  private_validateLinkCharacterLimit(link: string) {
    if (link.length > CHARACTER_LIMIT.link) {
      throw new Error(MESSAGE.linkHasInvalidCharacterLimit);
    }
  },

  private_validateLinkUrl(link: string) {
    const regexp = /^(https?:\/\/)/;
    const isInValidLink = !regexp.test(link);

    if (isInValidLink) {
      throw new Error(MESSAGE.linkHasInvalidProtocol);
    }
  },
};

export default RestaurantValidator;
