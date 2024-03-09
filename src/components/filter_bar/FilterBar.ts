import {
  selectOptionByFoodCategory,
  selectOptionByNameOrDistance,
} from "./eventHandlers";
import {
  renderBaseComponents,
  renderFilterBarComponents,
} from "./renderHandlers";

const FilterBar = () => {
  renderBaseComponents();
  renderFilterBarComponents();

  selectOptionByFoodCategory();
  selectOptionByNameOrDistance();
};
export default FilterBar;
