import BaseComponent from "../../../BaseComponent/BaseComponent";

class RestaurantTabBody extends BaseComponent {
  public render() {
    const tabStatus = this.getAttribute("status") ?? "";

    this.innerHTML = /* html */ `
      <restaurant-dropdown
        status='${tabStatus}'
      ></restaurant-dropdown>
      <restaurant-list
        status='${tabStatus}'
      ></restaurant-list>
    `;
  }
}

customElements.define("restaurant-tab-body", RestaurantTabBody);

export default RestaurantTabBody;
