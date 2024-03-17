import Component from "../common/Component";
import RestauranStorage from "../domain/RestaurantStorage";
import { Category, SortingStandard } from "../types";

export default class Selects extends Component {
  render() {
    const category = RestauranStorage.getCategory();
    const sortingStandard = RestauranStorage.getSortingStandard();

    return /*html*/ `
        <select name="category" class="category-select">
            <option value="전체">전체</option>
            <option ${
              category === "한식" ? "selected" : ""
            } value="한식">한식</option>
            <option ${
              category === "중식" ? "selected" : ""
            } value="중식">중식</option>
            <option ${
              category === "일식" ? "selected" : ""
            } value="일식">일식</option>
            <option ${
              category === "양식" ? "selected" : ""
            } value="양식">양식</option>
            <option ${
              category === "아시안" ? "selected" : ""
            } value="아시안">아시안</option>
            <option ${
              category === "기타" ? "selected" : ""
            } value="기타">기타</option>
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

  componentDidMount(): void {
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
