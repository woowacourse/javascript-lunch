import { CATEGORIES_KEYS } from '@/constants/Condition';
import { $ } from './DOM';

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
    return !Number.isNaN(distance);
  },
  isValidCategory(category: string) {
    return CATEGORIES_KEYS.includes(category);
  },
};

export const isValidateAndMakeErrorMessage = {
  category(category: string) {
    if (!validator.isValidCategory(category)) {
      $('#category-error').classList.remove('hidden');
    }
  },

  distance(distance: number) {
    if (!validator.isValidDistance(distance)) {
      $('#distance-error').classList.remove('hidden');
    }
  },

  name(name: string | null) {
    if (!validator.isValidName(name)) {
      $('#name-error').classList.remove('hidden');
    }
  },

  link(link: string) {
    if (!validator.isValidLink(link)) {
      $('#link-error').classList.remove('hidden');
    }
  },
};

export const validateAllValuesAndMakeErrorMessage = ({
  category,
  distance,
  name,
  link,
}: {
  category: string;
  distance: number;
  name: string;
  link: string | null;
}) => {
  isValidateAndMakeErrorMessage.category(category);
  isValidateAndMakeErrorMessage.distance(distance);
  isValidateAndMakeErrorMessage.name(name);
  link && isValidateAndMakeErrorMessage.link(link);
};

export const checkAllValuesValid = ({
  category,
  distance,
  name,
  link,
}: {
  category: string;
  distance: number;
  name: string;
  link: string;
}) => {
  if (!link) {
    return (
      validator.isValidCategory(category) &&
      validator.isValidDistance(distance) &&
      validator.isValidName(name)
    );
  }
  return (
    validator.isValidCategory(category) &&
    validator.isValidDistance(distance) &&
    validator.isValidLink(link) &&
    validator.isValidName(name)
  );
};
