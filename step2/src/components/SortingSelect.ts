import { Sorting } from '../types/restaurants';
import { useEvents } from '../utils/core/Core';
import Select from './Select';

const SORTING_OPTIONS = [
  { value: 'name', label: '이름순' },
  { value: 'distance', label: '거리순' },
];

interface SortingSelectProps {
  handleSortChange: (sorting: Sorting) => void;
  sorting: Sorting;
}

export const SortingSelect = (props: SortingSelectProps) => {
  const { handleSortChange, sorting } = props;
  const [addEvent] = useEvents('#sorting-filter');

  addEvent('change', '#sorting-filter', (e: Event) => {
    const target = e.target as HTMLSelectElement;
    handleSortChange(target.value as Sorting);
  });

  return Select({
    attribute: {
      id: 'sorting-filter',
      class: 'sorting-filter',
      name: 'sorting',
    },
    children: Select.Option({
      options: SORTING_OPTIONS,
      selectedValue: sorting,
    }),
  });
};
