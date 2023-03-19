import { sortByOption } from '../domains/filter';
import { isSortingOption } from '../type/customTypeGuards';

export const handleFilterChange = (target: HTMLSelectElement) => {
  const value = target.value;

  if (isSortingOption(value)) {
    return sortByOption(value);
  }
};
