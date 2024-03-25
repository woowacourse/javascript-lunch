import { FILTER_DROPDOWN_PROPS, SORT_DROPDOWN_PROPS } from '../../constant/options';
import { $ } from '../../utils/querySelector';
import createDropdown from '../Common/Dropdown';

interface Props {
  onCategoryChanged: (value: string) => void;
  onSortChanged: (value: string) => void;
}

const createFilteringBar = ({ onCategoryChanged, onSortChanged }: Props) => {
  const setEvents = () => {
    const categoryFilter = $('#category-filter');
    const sortingFilter = $('#sorting-filter');

    categoryFilter.addEventListener('change', (e: Event) => onCategoryChanged((e.target as HTMLSelectElement).value));
    sortingFilter.addEventListener('change', (e: Event) => onSortChanged((e.target as HTMLSelectElement).value));
  };

  const render = () => {
    const filterContainer = $('.restaurant-filter-container');

    createDropdown(FILTER_DROPDOWN_PROPS).forEach(node => {
      filterContainer.append(node);
    });
    createDropdown(SORT_DROPDOWN_PROPS).forEach(node => {
      filterContainer.append(node);
    });

    setEvents();
  };

  render();
};

export default createFilteringBar;
