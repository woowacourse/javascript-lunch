import { CATEGORIES, DISTANCES } from "../constants/menu";
import { CategoryString, Distance } from "../types/menu";

const restaurantValidator = {
  isValidLink(link: string): boolean {
    if (link === "") return true;

    const regex =
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return regex.test(link);
  },

  isValidCategory(category: string): boolean {
    return Object.values(CATEGORIES).includes(category as CategoryString);
  },

  isValidDistance(distance: number): boolean {
    return Object.values(DISTANCES).includes(Number(distance) as Distance);
  },

  isInRange(value: string, min: number, max: number): boolean {
    const valueLength = value.length;

    return valueLength <= max && valueLength > min;
  },

  isSelected(value: string): boolean {
    return value !== "";
  },
};

export default restaurantValidator;
