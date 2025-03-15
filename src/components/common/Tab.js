import Component from "../../core/Component";
import Restaurant from "../../domain/Restaurant.js";
import { AllLunchList, LunchList } from "../feature/index.js";

export default class Tab extends Component {
  setDefaultProps() {
    this.props = {
      tabs: [],
      activeIndex: 0,
      styles: {},
      onItemClick: () => {},
    };
  }

  initState() {
    this.state = {
      activeIndex: this.props.activeIndex || 0,
      items: Restaurant.restaurantLocalStorage || [],
    };
  }

  updateItems() {
    this.setState({ items: Restaurant.restaurantLocalStorage || [] });
    this.render();
  }

  renderAllList() {
    const list = this.addChild(AllLunchList, {
      type: "ALL",
      items: this.state.items,
      onItemClick: this.props.onItemClick,
    });

    return list.template();
  }

  renderFavoritesList() {
    const favoritesList = this.addChild(LunchList, {
      type: "FAVORITES",
      items: this.state.items.filter((item) => item.isFavorite),
      onItemClick: this.props.onItemClick,
    });

    return favoritesList.template();
  }

  setEvent() {
    this.addTabClickEvent();
    this.addItemAddedEvent();
    this.addFavoriteToggledEvent();
  }

  addTabClickEvent() {
    document.addEventListener("click", (e) => {
      const tabButton = e.target.closest("#tab-button");
      if (tabButton && tabButton.closest(`#tab-container`)) {
        this.setState({ activeIndex: parseInt(tabButton.dataset.index) });
      }
    });
  }

  addItemAddedEvent() {
    document.addEventListener("itemAdded", () => this.updateItems());
  }

  addFavoriteToggledEvent() {
    document.addEventListener("favoriteToggled", () => this.updateItems());
  }

  renderTabs() {
    return this.props.tabs
      .map((tab, index) => this.renderTabButton(tab, index))
      .join("");
  }

  renderTabButton(tab, index) {
    const { activeIndex } = this.state;
    return `
      <button
        id="tab-button"
        type="button"
        data-index="${index}"
        class="w-full text-lg py-16 cursor-pointer ${this.getTabButtonClass(
          index
        )}"
        style="background: none; border-top: none; border-left: none; border-right: none;"
      >
        ${tab}
      </button>
    `;
  }

  getTabButtonClass(index) {
    const { activeIndex } = this.state;
    return activeIndex === index
      ? "primary-500 border-b-primary"
      : "slate-400 border-b-slate";
  }

  template() {
    return `
      <div id="tab-container" class="w-full mt-8">
        <div class="flex flex-row justify-between px-16">
          ${this.renderTabs()}
        </div>
        <div id="tab-content-container">
          ${this.renderAllList()}
        </div>
      </div>
    `;
  }

  updateTabButtons(container) {
    const tabButtons = container.querySelectorAll("#tab-button");
    tabButtons.forEach((button, index) => {
      this.updateButtonClass(button, index);
    });
  }

  updateButtonClass(button, index) {
    const { activeIndex } = this.state;
    button.classList.remove("primary-500", "border-b-primary");
    button.classList.add("slate-400", "border-b-slate-solid");
    if (index === activeIndex) {
      button.classList.remove("slate-400", "border-b-slate-solid");
      button.classList.add("primary-500", "border-b-primary");
    }
  }

  updateTabContent(container) {
    const tabContentContainer = container.querySelector(
      "#tab-content-container"
    );
    if (tabContentContainer) {
      tabContentContainer.innerHTML =
        this.state.activeIndex === 0
          ? this.renderAllList()
          : this.renderFavoritesList();
    }
  }

  render(props, targetElement = `#tab-container`) {
    if (props) this.setProps(props);
    const container = document.querySelector(targetElement);
    if (!container) return super.render(props, targetElement);
    this.updateTabButtons(container);
    this.updateTabContent(container);
    return this;
  }
}
