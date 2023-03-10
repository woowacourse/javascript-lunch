import "./index.css";

class Tab {
  $target;

  constructor($target) {
    this.$target = $target;
    this.render();
  }

  template() {
    return `
        <input type="radio" name="tab" id="all" value="all" checked />  
        <label for="all" class='tab-item all-tab'>
          모든 음식점
        </label>
        
        <input type="radio" name="tab" id="favorite" value="favorite" />
        <label for="favorite" class='tab-item favorite-tab'>
          자주 가는 음식점
        </label>
        `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }

  setOnSelectEvent(restaurantList) {
    this.$target.addEventListener("change", (event) => {
      const selectedTab = event.target.value;
      if (selectedTab === "all") {
        restaurantList.renderAllList();
      }
      if (selectedTab === "favorite") {
        restaurantList.renderFavoriteList();
      }
    });
  }
}

export default Tab;
