import { CATEGORIES_KEYS } from '@/constants/Condition';

const validator = {
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

export default validator;
