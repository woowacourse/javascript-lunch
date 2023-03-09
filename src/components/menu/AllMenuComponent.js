import MenuComponent from "./MenuComponent";
import dispatcher from "../../domain/Dispatcher";
import MenuInstance from "../../domain/store/MenuStore";

class AllMenuComponent extends MenuComponent {
  menuTitle = "모든 음식점";

  connectedCallback() {
    super.connectedCallback();
    MenuInstance.subscribe(this);
    MenuInstance.publish();
  }

  handleEvent() {
    this.addEventListener("click", () => {
      dispatcher("menu_all");
    });
  }

  rerender(menu) {
    if (menu === "all") {
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

customElements.define("all-restaurants-menu", AllMenuComponent);
export default AllMenuComponent;
