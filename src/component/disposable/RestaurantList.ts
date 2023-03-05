import { $ } from "@/utils/Dom";

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

  replaceTemplate(newTemplate: string) {
    this.removeTemplate();
    $(".restaurant-list")?.insertAdjacentHTML("beforeend", newTemplate);
  }

  removeTemplate() {
    const list = $(".restaurant-list") as HTMLElement;
    list.innerHTML = "";
  }
}

export default new RestaurantList();
