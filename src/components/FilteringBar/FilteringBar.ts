import { FILTER_DROPDOWN_PROPS, SORT_DROPDOWN_PROPS } from '../../constant/options';
import { $ } from '../../utils/querySelector';
import Dropdown from '../Common/Dropdown';

interface Props {
  onCategoryChanged: (value: string) => void;
  onSortChanged: (value: string) => void;
}

const createFilteringBar = ({ onCategoryChanged, onSortChanged }: Props) => {
  const render = () => {
    const filterContainer = $('.restaurant-filter-container');

    const filterDropdown = Dropdown(FILTER_DROPDOWN_PROPS);
    const sortDropdown = Dropdown(SORT_DROPDOWN_PROPS);

    filterContainer.insertAdjacentHTML('beforeend', filterDropdown);
    filterContainer.insertAdjacentHTML('beforeend', sortDropdown);

    setEvents();
  };

  const setEvents = () => {
    const categoryFilter = $('#category-filter');
    const sortingFilter = $('#sorting-filter');

    categoryFilter.addEventListener('change', (e: Event) => onCategoryChanged((e.target as HTMLSelectElement).value));

    sortingFilter.addEventListener('change', (e: Event) => onSortChanged((e.target as HTMLSelectElement).value));
  };

  render();
};

export default createFilteringBar;
