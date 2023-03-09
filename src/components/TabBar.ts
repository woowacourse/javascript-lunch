import Controller from "../domain/Controller";
class TabBar extends HTMLElement {
  private controller;
  private selectedIndex;
  constructor() {
    super();
    this.controller = Controller.getInstance();
    this.selectedIndex = 0;
    this.render();
    this.onClickTab();
  }
  render() {
    this.innerHTML = `
      <div class="tab-container">
        <div id="tab-${0}" class="tab tab-selected">모든 음식점</div>
        <div id="tab-${1}" class="tab">자주 가는 음식점</div>
      </div>
    `;
  }
  onClickTab() {
    const tabs = this.querySelectorAll(".tab");
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        this.selectedIndex = index;
        if (this.selectedIndex == 0) {
          document
            .getElementById(`tab-${this.selectedIndex}`)
            ?.classList.add("tab-selected");
          document.getElementById(`tab-${1}`)?.classList.remove("tab-selected");
          this.controller.loadLocalStorage();
          this.controller.renderRestaurantList();
        }
        if (this.selectedIndex == 1) {
          document
            .getElementById(`tab-${this.selectedIndex}`)
            ?.classList.add("tab-selected");
          document.getElementById(`tab-${0}`)?.classList.remove("tab-selected");
          this.controller.renderFavoriteRestaurantList();
        }
      });
    });
  }
}
export default TabBar;
