import filter from '../domains/filter';

export const handleFilterChange = (target: HTMLSelectElement) => {
  const value = target.value;

  return filter.sortByOption(value);
};
