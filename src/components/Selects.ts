import Component from "../common/Component";
import RestauranStorage from "../domain/RestaurantStorage";
import { Category, SortingStandard } from "../types";
import { CATEGORIES } from "../constants";

interface SelectsProps {
  loadRestaurant: Function;
}

export default class Selects extends Component<HTMLDivElement, SelectsProps> {
  render() {
    const category = RestauranStorage.getCategory();
    const sortingStandard = RestauranStorage.getSortingStandard();
    return /*html*/ `
        <select name="category" class="category-select">
            <option value="전체">전체</option>
            ${CATEGORIES.map(
              (CATEGORY) =>
                `<option ${
                  category === CATEGORY ? "selected" : ""
                } value="${CATEGORY}">${CATEGORY}</option>`
            ).join("")}
        </select>

        <!-- 정렬 셀렉트 박스 -->
        <select name="sorting" class="sorting-select">
            <option ${
              sortingStandard === "name" ? "selected" : ""
            } value="name">이름순</option>
            <option ${
              sortingStandard === "distance" ? "selected" : ""
            } value="distance">거리순</option>
        </select>
        `;
  }

  setEvents(): void {
    if (!this.props) return;
    const { loadRestaurant } = this.props;

    const $categorySelect =
      document.querySelector<HTMLSelectElement>(".category-select");
    const $sortingSelect =
      document.querySelector<HTMLSelectElement>(".sorting-select");

    $categorySelect?.addEventListener("change", (e) => {
      const option = e.target as HTMLOptionElement;
      if (option?.value) {
        RestauranStorage.changeCategory(option.value as Category | "전체");
        loadRestaurant();
      }
    });

    $sortingSelect?.addEventListener("change", (e) => {
      const option = e.target as HTMLOptionElement;
      if (option?.value) {
        RestauranStorage.changeSortingStandard(option.value as SortingStandard);
        loadRestaurant();
      }
    });
  }
}
