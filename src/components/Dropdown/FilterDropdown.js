import { label } from "../../constants/optionValue.js";
import Component from "../Component.js";

class FilterDropdown extends Component {
  template() {
    return `
        <select name="${this.props.id}" id="${this.props.id}-filter" class="restaurant-filter">
        ${Object.entries(this.props.optionValue)
          .map(
            ([key, value]) =>
              `<option value="${key}" ${key === this.props.selectedValue ? "selected" : ""}>${value}</option>`,
          )
          .join("")}
        </select>
        `;
  }

  setEvent() {
    this.$target.addEventListener("change", (e) => {
      this.props.onChange(e.target.value);
    });
  }
  setState(newState) {
    this.props.selectedValue = newState.selectedValue;
    this.render();
  }
}
export default FilterDropdown;
