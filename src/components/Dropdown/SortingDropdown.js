import { SORT_OPTIONS } from './constant.js';
import Dropdown from './Dropdown.js';

const SortingDropdown = ({ onChange }) => {
  return Dropdown({
    id: 'sorting-filter',
    name: 'sorting',
    className: 'restaurant-filter',
    options: SORT_OPTIONS,
    onChange
  });
};

export default SortingDropdown;
