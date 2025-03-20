import { CATEGORY_OPTIONS } from './constant.js';
import Dropdown from './Dropdown.js';

const CategoryDropdown = ({ onChange }) => {
  return Dropdown({
    id: 'category-filter',
    name: 'category',
    className: 'restaurant-filter',
    options: CATEGORY_OPTIONS,
    onChange
  });
};

export default CategoryDropdown;
