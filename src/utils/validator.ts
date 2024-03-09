import { CATEGORIES_KEYS } from '@/constants/Condition';

export const validator = {
  isValidLink(link: string) {
    const regex =
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
    return regex.test(link);
  },
  isValidName(name: string | null) {
    return name && name.length <= 10;
  },
  isValidDistance(distance: number | string) {
    return Number.isNaN(distance);
  },
  isValidCategory(category: string) {
    return CATEGORIES_KEYS.includes(category);
  },
};

export const isValidateAndMakeErrorMessage = {
  category(category: string) {
    if (!validator.isValidCategory(category)) {
      document.querySelector('#category-error')?.classList.remove('hidden');
    }
  },

  distance(distance: number) {
    if (!validator.isValidDistance(distance)) {
      document.querySelector('#distance-error')?.classList.remove('hidden');
    }
  },

  name(name: string | null) {
    if (!validator.isValidName(name)) {
      document.querySelector('#name-error')?.classList.remove('hidden');
    }
  },

  link(link: string) {
    if (!validator.isValidLink(link)) {
      document.querySelector('#link-error')?.classList.remove('hidden');
    }
  },
};
