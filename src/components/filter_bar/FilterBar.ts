import { changeFilter, changeSorting } from "./handlers";
import {
  generateBaseComponents,
  generateFilterBarComponents,
} from "./renderHandlers";

const FilterBar = () => {
  generateBaseComponents();
  generateFilterBarComponents();

  changeFilter();
  changeSorting();
};
export default FilterBar;
