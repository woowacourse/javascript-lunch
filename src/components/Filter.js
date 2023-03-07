import { CATEGORY, SORT } from "../constants";
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
          ${Object.values(SORT).map(
            (sortValue) =>
              `<option value="${sortValue}" ${sortingWay === sortValue ? "selected" : ""}>${sortValue}</option>`
          )}
        </select>
    `;
  }

  setEvent() {
    const { onChangeSortingWay, onChangeCategory } = this.props;

    this.addEvent("change", "#sorting-filter", onChangeSortingWay);
    this.addEvent("change", "#category-filter", onChangeCategory);
  }
}
