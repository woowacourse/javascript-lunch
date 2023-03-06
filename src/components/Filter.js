import { CATEGORY } from "../constants";
import Component from "../core/Component";

export default class Filter extends Component {
  template() {
    const { sortingWay, category } = this.props;

    return `
        <select name="category" id="category-filter" class="restaurant-filter">
          ${Object.values(CATEGORY).map(
            (categoryValue) =>
              `<option value=${categoryValue} ${category === categoryValue ? "selected" : ""}>${categoryValue}</option>`
          )}
        </select>

        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          <option value="name" ${sortingWay === "name" ? "selected" : ""}>이름순</option>
          <option value="distance" ${sortingWay === "distance" ? "selected" : ""}>거리순</option>
        </select>
    `;
  }

  setEvent() {
    const { setSortingWay, setCategory } = this.props;

    this.addEvent("change", "#sorting-filter", setSortingWay);
    this.addEvent("change", "#category-filter", setCategory);
  }
}
