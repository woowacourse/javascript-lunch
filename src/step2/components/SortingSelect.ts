import { Sorting } from '../types/restaurants';
import { $ } from '../utils/@common/domHelper';
import EventManager from '../utils/@common/EventManager';
import Select from './Select';

const SORTING_OPTIONS = [
  { value: 'name', label: '이름순' },
  { value: 'distance', label: '거리순' },
];

interface SortingSelectProps {
  setSorting: (sorting: Sorting) => void;
  sorting: Sorting;
}

export const SortingSelect = (props: SortingSelectProps) => {
  const { setSorting, sorting } = props;
  const eventManager = new EventManager($('#app'));

  eventManager.addEvent('change', '#sorting-filter', (e: Event) => {
    const target = e.target as HTMLSelectElement;
    setSorting(target.value as Sorting);
  });

  return Select({
    attribute: {
      id: 'sorting-filter',
      class: 'restaurant-filter',
      name: 'sorting',
    },
    children: Select.Option({
      options: SORTING_OPTIONS,
      selectedValue: sorting,
    }),
  });
};
