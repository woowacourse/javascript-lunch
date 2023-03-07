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
                .restaurant-menu-container {
                    width: 100%;
                    height: 42px;
                    padding: 0 16px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    position: fixed;
                    top: 95px;
                    background: #fff;
                    z-index: 1;
                }
            </style>
            <section class="restaurant-menu-container">
                <all-restaurants-menu></all-restaurants-menu>
                <favorite-restaurants-menu></favorite-restaurants-menu>
            </section>
        `;
  }
}

customElements.define("menu-container", MenuContainer);
export default MenuContainer;
