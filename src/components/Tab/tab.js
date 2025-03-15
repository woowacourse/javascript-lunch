import Component from "../Component.js";

class Tab extends Component {
  template() {
    return `
    <div class="tab text-tab-title ${this.props.activeTab === "all" ? "active" : ""}" data-title="all">
      모든 음식점
        </div>
        <div class="tab text-tab-title ${this.props.activeTab === "frequently-visited" ? "active" : ""}" data-title="frequently-visited">
        자주 가는 음식점
        </div>
      `;
  }

  setEvent() {
    this.$target.addEventListener("click", (event) => {
      const targetTab = event.target.closest("[data-title]");

      document.dispatchEvent(
        new CustomEvent("tabClicked", {
          detail: {
            targetTabTitle: targetTab.dataset.title,
          },
        }),
      );
    });
  }

  updateActiveTab(newActiveTab) {
    this.setState({ activeTab: newActiveTab });

    this.$target.querySelectorAll(".tab").forEach((tab) => {
      const tabTitle = tab.dataset.title;
      if (tabTitle === newActiveTab) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }
}

export default Tab;
