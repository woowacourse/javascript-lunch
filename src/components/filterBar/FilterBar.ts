import { selectOptionByFoodCategory, selectOptionByNameOrDistance } from './eventHandlers';
import { renderBaseFilterBarComponents, renderFilterBarComponents } from './renderHandlers';

const FilterBar = () => {
  renderBaseFilterBarComponents();
  renderFilterBarComponents();

  selectOptionByFoodCategory();
  selectOptionByNameOrDistance();
};
export default FilterBar;
