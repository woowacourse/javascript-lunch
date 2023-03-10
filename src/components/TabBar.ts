import Controller from "../domain/Controller";
class TabBar extends HTMLElement {
  private controller;

  constructor() {
    super();
    this.controller = Controller.getInstance();
    this.render();
    this.onClickTab();
  }

  render() {
    this.innerHTML = `
      <form id="tabContainer" class="tab-container">
        <input id="all" name="tab" value="all" type="radio" class="radio" checked>
        <label id="tab" class="tab tab-selected" for="all">모든 음식점</label>
        <input id="favorite" name="tab" value="favorite" type="radio" class="radio">
        <label id="tab" class="tab" for="favorite">자주 가는 음식점</label>
      </form>
    `;
  }

  onClickTab() {
    const tabContainer = document.getElementById("tabContainer");
    tabContainer?.addEventListener("change", (event: any) => {
      const restaurantFilter = document.getElementById(
        "restaurantFilterContainer"
      );
      if (!(restaurantFilter instanceof HTMLElement)) {
        return;
      }
      if (event.target.value == "favorite") {
        restaurantFilter.style.display = "none";
        this.controller.setFavoriteRestaurantList();
        return;
      }
      restaurantFilter.style.display = "";
      this.controller.loadLocalStorage();
    });
  }
}
export default TabBar;
