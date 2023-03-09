import { CUSTOM_ELEMENT } from "../../abstracts/constants";
import CustomElement from "../../abstracts/CustomElement";
import AllMenuComponent from "./AllMenuComponent";
import FavoriteMenuComponent from "./FavoriteMenuComponent";

class MenuContainer extends CustomElement {
  template() {
    return `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                :host {
                    width: 100vw;
                    height: 72px;
                    position: fixed;
                    top: 64px;
                    z-index: 1;
                }
                .restaurant-menu-container {
                    width: 100%;
                    height: 100%;
                    padding: 0 16px;
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;
                    justify-content: center;
                    background: #fff;
                }
            </style>
            <section class="restaurant-menu-container">
                <all-restaurants-menu></all-restaurants-menu>
                <favorite-restaurants-menu></favorite-restaurants-menu>
            </section>
        `;
  }
}

customElements.define(CUSTOM_ELEMENT.MENU_CONTAINER, MenuContainer);
export default MenuContainer;
