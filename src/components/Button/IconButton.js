import Component from "../Component.js";

class IconButton extends Component {
  initState() {
    return { isButtonClicked: false };
  }
  template() {
    return `<button class="favorite_add_button">
        <img src="./favorite-icon-lined.png" alt="empty-star" class="favorite-icon"/>
      </button>`;
  }

  setEvent() {
    const favoriteButton = this.$target.querySelector(".favorite_add_button");
    if (favoriteButton) {
      favoriteButton.addEventListener("click", () => {
        const img = favoriteButton.querySelector("img");
        if (img.alt === "empty-star") {
          img.src = "./favorite-icon-filled.png";
          img.alt = "filled-star";
        } else {
          img.src = "./favorite-icon-lined.png";
          img.alt = "empty-star";
        }
      });
    }
  }
  render() {
    return this.template();
  }
}

export default IconButton;
