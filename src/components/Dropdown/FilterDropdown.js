import { label } from "../../constants/optionValue.js";

const FilterDropdown = ({ id, optionValue }) => {
  return `
    <select name="${id}" id="${id}-filter" class="restaurant-filter">
      ${Object.entries(optionValue)
        .map(([key, value]) => `<option value="${key}">${value}</option>`)
        .join("")}    
    </select>
  `;
};

export default FilterDropdown;
