import MenuComponent from "./MenuComponent";
import dispatcher from "../../domain/Dispatcher";
import MenuInstance from "../../domain/store/MenuStore";
import { MENU_TITLE } from "../../abstracts/constants";

class FavoriteMenuComponent extends MenuComponent {
  menuTitle = MENU_TITLE.FAVORITE;

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

customElements.define("favorite-restaurants-menu", FavoriteMenuComponent);
export default FavoriteMenuComponent;
