import BaseComponent from "../BaseComponent";

class RestaurantTab extends BaseComponent {
  protected render() {
    const text = this.getAttribute("text") ?? "";
    const isActive = this.getAttribute("is-active") === "true" ? true : false;

    this.innerHTML = /*html*/ `
      <span class="${
        isActive ? "font-orange" : "font-gray"
      } text-body font-bold text-center">${text}</span>
      <div class="${
        isActive ? "border-orange" : "border-gray"
      } tab-border-bottom"></div>
    `;
  }
}

customElements.define("restaurant-tab", RestaurantTab);
