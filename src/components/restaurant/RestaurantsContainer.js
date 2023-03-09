import CustomElement from "../../abstracts/CustomElement";
import FavoriteRestaurantListComponent from "./FavoriteRestaurantListComponent";
import RestaurantListComponent from "./RestaurantListComponent";
import MenuInstance from "../../domain/store/MenuStore";
import { CUSTOM_ELEMENT } from "../../abstracts/constants";

class RestaurantsContainer extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MenuInstance.subscribe(this);
    MenuInstance.publish();
  }

  rerender(menu) {
    const style = this.shadowRoot.querySelector("style");
    switch (menu) {
      case "all":
        style.innerHTML = `
                :host {
                    width: 200%;
                    display: flex;
                    flex-direction: row;
                    position: relative;
                    left: 0;
                    transition: all 0.4s ease-out;
                }
            `;
        break;
      case "favorite":
        style.innerHTML = `
                :host {
                    width: 200%;
                    display: flex;
                    flex-direction: row;
                    position: relative;
                    left: -100%;
                    transition: all 0.4s ease-out;
                }
            `;
        break;
    }
  }

  template() {
    return `
            <style></style>
            <restaurant-list></restaurant-list>
            <favorite-restaurant-list></favorite-restaurant-list>
        `;
  }
}

customElements.define(
  CUSTOM_ELEMENT.RESTAURANT_CONTAINER,
  RestaurantsContainer
);
export default RestaurantsContainer;
