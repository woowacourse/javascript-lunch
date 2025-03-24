import Component from "../Component.js";
import storageUtil from "../storageUtil.js";
class IconButton extends Component {
  initState() {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favoriteRestaurantList") || "[]",
    );

    return {
      isButtonClicked: savedFavorites.includes(this.props.restaurantId),
    };
  }
  template() {
    const imgSrc = this.state.isButtonClicked
      ? "./favorite-icon-filled.png"
      : "./favorite-icon-lined.png";
    const imgAlt = this.state.isButtonClicked ? "filled-star" : "empty-star";

    return `<button class="favorite_add_button">
    <img src="${imgSrc}" alt="${imgAlt}" class="favorite-icon"/>
  </button>`;
  }

  setEvent() {
    const favoriteButton = this.$target.querySelector(".favorite_add_button");

    if (favoriteButton) {
      favoriteButton.addEventListener("click", (e) => {
        e.stopPropagation();

        const newState = !this.state.isButtonClicked;
        this.setState({ isButtonClicked: newState });
        const savedFavorites =
          storageUtil.get("favoriteRestaurantList") || "[]";

        let updatedFavorites = [...savedFavorites];

        if (newState) {
          if (!updatedFavorites.includes(this.props.restaurantId)) {
            updatedFavorites.push(this.props.restaurantId);
          }
        } else {
          updatedFavorites = updatedFavorites.filter(
            (id) => id !== this.props.restaurantId,
          );
        }

        storageUtil.add("favoriteRestaurantList", updatedFavorites);

        document.dispatchEvent(
          new CustomEvent("favoriteUpdated", {
            detail: {
              favoriteRestaurants: updatedFavorites,
            },
          }),
        );
      });
    }
  }
}

export default IconButton;
