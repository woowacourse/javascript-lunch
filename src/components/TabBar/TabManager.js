class TabManager {
  #restaurantManager;
  #renderMainArea;
  #activeTab;

  constructor(restaurantManager, renderMainArea) {
    this.#restaurantManager = restaurantManager;
    this.#renderMainArea = renderMainArea;
    this.#activeTab = "list";
    this.#setupTabListeners();
  }

  #setupTabListeners() {
    const $listTab = document.querySelector("#list-tab");
    const $favoriteTab = document.querySelector("#favorite-tab");

    $listTab.addEventListener("click", () => this.#switchTab("list"));
    $favoriteTab.addEventListener("click", () => this.#switchTab("favorite"));
  }

  #switchTab(type) {
    if (this.#activeTab === type) return;

    this.#activeTab = type;
    const $listTab = document.querySelector("#list-tab");
    const $favoriteTab = document.querySelector("#favorite-tab");

    if (type === "list") {
      $listTab.classList.add("active");
      $favoriteTab.classList.remove("active");
      this.#renderMainArea();
      return;
    }

    $listTab.classList.remove("active");
    $favoriteTab.classList.add("active");
    this.#restaurantManager.renderFavoriteList();
  }
}

export default TabManager;
