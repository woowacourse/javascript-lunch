import { components } from '../components/components';
import filter from '../domains/filter';

export const handleFilterChange = (event: Event) => {
  const target = event.target;

  if (target instanceof HTMLSelectElement) {
    const value = target.value;
    const selectedList = filter.sortByOption(value);

    components.restaurantList.render(selectedList);
  }
};
