import Component from "../common/Component";
import RestauranStorage from "../domain/RestaurantStorage";

interface FilterProps {
  loadRestaurant: Function;
}

export default class Filter extends Component<HTMLDivElement, FilterProps> {
  render() {
    const filter = RestauranStorage.getFilter();
    return /*html*/ `
            <div class="filter all text-body ${
              filter === "all" ? "filter-on" : ""
            }">모든 음식점</div> 
            <div class="filter bookmark text-body ${
              filter === "bookmark" ? "filter-on" : ""
            }" >자주 가는 음식점</div>
        `;
  }

  componentDidMount(): void {
    if (!this.props) return;
    const { loadRestaurant } = this.props;
    const $allFilter = document.querySelector<HTMLDivElement>(".filter.all");
    const $bookmarkFilter =
      document.querySelector<HTMLDivElement>(".filter.bookmark");
    if (!$allFilter || !$bookmarkFilter) return;

    $allFilter.addEventListener("click", () => {
      if (!$allFilter.classList.contains("filter-on")) {
        RestauranStorage.changeFilter("all");
        loadRestaurant();
      }
    });
    $bookmarkFilter.addEventListener("click", () => {
      if (!$bookmarkFilter.classList.contains("filter-on")) {
        RestauranStorage.changeFilter("bookmark");
        loadRestaurant();
      }
    });
  }
}
