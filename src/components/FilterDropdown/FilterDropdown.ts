import { FILTER_DROPDOWN_PROPS, SORT_DROPDOWN_PROPS } from '../../constant/options';
import Dropdown from '../Common/Dropdown';

interface Props {
  onChangeFilter?: (value: string) => void;
  onChangeSort?: (value: string) => void;
}

const createFilterDropdown = ({ onChangeFilter, onChangeSort }: Props) => {
  const filterContainer = document.createElement('div');
  filterContainer.classList.add('restaurant-filter-container');

  const filterDropdown = Dropdown(FILTER_DROPDOWN_PROPS);
  const sortDropdown = Dropdown(SORT_DROPDOWN_PROPS);

  filterContainer.appendChild(filterDropdown);
  filterContainer.appendChild(sortDropdown);

  if (onChangeFilter) {
    filterDropdown.addEventListener('change', (event: any) => {
      onChangeFilter(event.target.value);
    });
  }

  if (onChangeSort) {
    sortDropdown.addEventListener('change', (event: any) => {
      onChangeSort(event.target.value);
    });
  }

  return filterContainer;
};

export default createFilterDropdown;
