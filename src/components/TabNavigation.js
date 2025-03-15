import { $ } from "../utils/selector.js";
import Component from "./core/Component.js";

class TabNavigation extends Component {
  setup() {
    this.state = {
      activeTab: "all",
    };
  }

  template() {
    return /*html*/ `
      <div id='tab-navigation' class="tab-navigation">
        <button id='all-tab' class="tab ${
          this.state.activeTab === "all" ? "active" : ""
        }" data-tab="all">모든 음식점</button>
        <button id='favorite-tab' class="tab ${
          this.state.activeTab === "favorite" ? "active" : ""
        }" data-tab="favorite">자주 가는 음식점</button>
      </div>
    `;
  }

  componentDidMount() {
    const $tabNavigation = $(this.$target, ".tab-navigation");
    $tabNavigation.addEventListener("click", (event) => {
      const { tab } = event.target.dataset;

      if (tab) {
        this.handleTabClick(tab);
      }
    });
  }

  handleTabClick(tab) {
    if (this.state.activeTab === tab) {
      return;
    }
    this.setState({ activeTab: tab });
    this.props.onTabChange(tab);

    const $tabNavigation = $(this.$target, ".tab-navigation");
    const $allTab = $($tabNavigation, "#all-tab");
    const $favoriteTab = $($tabNavigation, "#favorite-tab");

    if (this.state.activeTab === "all") {
      $allTab.classList.add("active");
      $favoriteTab.classList.remove("active");
      return;
    }

    $allTab.classList.remove("active");
    $favoriteTab.classList.add("active");
  }
}

export default TabNavigation;
