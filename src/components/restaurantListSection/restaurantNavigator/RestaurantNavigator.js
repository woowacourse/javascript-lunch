import "./restaurantNavigator.css";

export default class RestaurantNavigator {
  #selected;
  #list;
  #updateList;

  constructor(list, updateList) {
    this.#selected = "all";
    this.#list = list;
    this.#updateList = updateList;
    this.$restaurantLitsHeader = document.createElement("div");
  }

  render() {
    this.$restaurantLitsHeader.replaceChildren();
    this.$restaurantLitsHeader.className = "restaurant-list-header";

    const $leftButton = document.createElement("button");
    $leftButton.classList.add("select-button");
    $leftButton.textContent = "모든 음식점";
    $leftButton.id = "all";

    const $rightButton = document.createElement("button");
    $rightButton.classList.add("select-button");
    $rightButton.textContent = "자주 가는 음식점";
    $rightButton.id = "bookmark";

    if (this.#selected === "all") {
      $leftButton.classList.add("selected");
      $rightButton.classList.remove("selected");
    }

    if (this.#selected === "bookmark") {
      $rightButton.classList.add("selected");
      $leftButton.classList.remove("selected");
    }

    this.$restaurantLitsHeader.appendChild($leftButton);
    this.$restaurantLitsHeader.appendChild($rightButton);
    this.$restaurantLitsHeader.addEventListener("click", this.#handleClick);

    return this.$restaurantLitsHeader;
  }

  #updateSelected(selected) {
    this.#selected = selected;
    this.render();
  }

  #handleClick = (e) => {
    let filteredList = [];
    let selected;
    const { id } = e.target;

    if (id === "all") {
      filteredList = [...this.#list];
    }
    if (id === "bookmark") {
      filteredList = this.#list.filter((restaurant) => restaurant.bookmark);
    }

    this.#updateSelected(id);
    this.#updateList(filteredList);
  };
}
