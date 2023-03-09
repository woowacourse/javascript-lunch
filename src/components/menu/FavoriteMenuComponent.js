import MenuComponent from "./MenuComponent";
import dispatcher from "../../domain/Dispatcher";
import MenuInstance from "../../domain/store/MenuStore";
import { CUSTOM_ELEMENT } from "../../abstracts/constants";

class FavoriteMenuComponent extends MenuComponent {
  menuTitle = "자주 가는 음식점";

  connectedCallback() {
    super.connectedCallback();
    MenuInstance.subscribe(this);
    MenuInstance.publish();
  }

  handleEvent() {
    this.addEventListener("click", () => {
      dispatcher("menu_favorite");
    });
  }

  rerender(menu) {
    if (menu === "favorite") {
      this.borderColor = "var(--primary-color)";
      this.textColor = "var(--primary-color)";
      super.rerender();
      return;
    }
    this.borderColor = "var(--grey-200)";
    this.textColor = "var(--grey-300)";
    super.rerender();
  }
}

customElements.define(
  CUSTOM_ELEMENT.FAVORITE_RESTAURANTS_MENU,
  FavoriteMenuComponent
);
export default FavoriteMenuComponent;
