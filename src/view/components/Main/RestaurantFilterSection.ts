import {
  categories,
  sortingStandards,
  sortingStandardsMapper,
} from "../../../constants";
import { Category, SortingStandard, isCategory } from "../../../types";
import BaseComponent from "../../../util/BaseComponent";

interface Props {
  currentCategory: Category | "전체";
  currentSortingStandard: SortingStandard;
  onCategoryChange: (category: Category | "전체") => void;
  onSortingStandardChange: (sortingStandard: SortingStandard) => void;
}

interface State {}

class RestaurantFilterSection extends BaseComponent<Props, State> {
  protected state: State;

  constructor(props: Props) {
    const $section = document.createElement("section");
    $section.classList.add("restaurant-filter-container");
    super($section, props);
    this.state = {};
  }

  protected setEvent(): void {
    this.addEvent("select#category-filter", "change", (event: Event) => {
      if (event.target instanceof HTMLSelectElement) {
        if (isCategory(event.target.value) || event.target.value === "전체")
          this.props.onCategoryChange(event.target.value);
      }
    });
    this.addEvent("select#sorting-filter", "change", (event: Event) => {
      if (event.target instanceof HTMLSelectElement) {
        if (
          event.target.value === "name" ||
          event.target.value === "distance"
        ) {
          this.props.onSortingStandardChange(event.target.value);
        }
      }
    });
  }

  protected compose(): void {
    this.$root.innerHTML = this.innerHTML();
  }

  private innerHTML() {
    return /*html*/ `
      <select name="category" id="category-filter" class="restaurant-filter">
        ${["전체", ...categories].map(
          (category) =>
            /*html*/ `<option value=${category} ${
              this.props.currentCategory === category ? "selected" : ""
            }>${category}</option>`
        )}
      </select>
      
      <!-- 정렬 셀렉트 박스 -->
      <select name="sorting" id="sorting-filter" class="restaurant-filter">
        ${sortingStandards.map(
          (sortingStandard) =>
            /*html*/ `<option value=${sortingStandard} ${
              this.props.currentSortingStandard === sortingStandard
                ? "selected"
                : ""
            }>${sortingStandardsMapper[sortingStandard]}</option>`
        )}
      </select>
    `;
  }
}

export default RestaurantFilterSection;
