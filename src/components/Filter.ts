import Component from "../common/Component";

export default class Filter extends Component {
  render() {
    const { filter } = this.props;
    return /*html*/ `
            <div class="filter all text-body ${
              filter === "all" && "filter-on"
            }">모든 음식점</div> 
            <div class="filter bookmark text-body ${
              filter === "bookmark" && "filter-on"
            }" >자주 가는 음식점</div>
        `;
  }

  componentDidMount(): void {
    const { changeFilter } = this.props;
    const $allFilter = document.querySelector<HTMLDivElement>(".filter.all");
    const $bookmarkFilter =
      document.querySelector<HTMLDivElement>(".filter.bookmark");
    if (!$allFilter || !$bookmarkFilter) return;

    $allFilter.addEventListener("click", () => {
      if (!$allFilter.classList.contains("filter-on")) {
        $allFilter.classList.toggle("filter-on");
        $bookmarkFilter.classList.toggle("filter-on");
        changeFilter("all");
      }
    });
    $bookmarkFilter.addEventListener("click", () => {
      if (!$bookmarkFilter.classList.contains("filter-on")) {
        $allFilter.classList.toggle("filter-on");
        $bookmarkFilter.classList.toggle("filter-on");
        changeFilter("bookmark");
      }
    });
  }
}
