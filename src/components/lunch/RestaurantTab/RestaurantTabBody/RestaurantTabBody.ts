import BaseComponent from "../../../BaseComponent/BaseComponent";

class RestaurantTabBody extends BaseComponent {
  public render() {
    const children = this.getAttribute("children");

    this.innerHTML = `
        ${children}
    `;
  }
}

customElements.define("restaurant-tab-body", RestaurantTabBody);

export default RestaurantTabBody;
