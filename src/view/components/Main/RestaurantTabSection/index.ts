import BaseComponent from "../../../../util/BaseComponent";

interface Props {
  currentTab: string;
  onAllTabClick: () => void;
  onFavoriteTabClick: () => void;
}

interface State {}

class RestaurantTabSection extends BaseComponent<Props, State> {
  protected state: State;

  constructor(props: Props) {
    const $section = document.createElement("section");
    $section.classList.add("restaurant-list-tab-container");
    super($section, props);
    this.state = {};
  }

  protected setEvent(): void {
    this.addEvent("#all-tab", "click", () => {
      this.props.onAllTabClick();
    });
    this.addEvent("#favorite-tab", "click", () => {
      this.props.onFavoriteTabClick();
    });
  }

  protected compose(): void {
    this.$root.innerHTML = this.innerHTML();
  }

  private innerHTML() {
    return /*html*/ `
      <div id="all-tab" class="restaurant-list-tab ${
        this.props.currentTab === "all" ? "restaurant-list-tab__active" : ""
      }">
        모든 음식점
      </div>
      <div id="favorite-tab" class="restaurant-list-tab ${
        this.props.currentTab === "favorite"
          ? "restaurant-list-tab__active"
          : ""
      }">자주 가는 음식점</div>
    `;
  }
}

export default RestaurantTabSection;
