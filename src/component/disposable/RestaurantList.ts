import { $ } from "../../utils/Dom";

class RestaurantList {
  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
      </ul>
    </section>`;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  replaceTemplate(newTemplates: string) {
    this.removeTemplate();
    $(".restaurant-list")?.insertAdjacentHTML("beforeend", newTemplates);
  }

  removeTemplate() {
    const list = $(".restaurant-list");
    while (list?.firstChild) {
      list.removeChild(list.firstChild);
    }
  }
}

export default new RestaurantList();
