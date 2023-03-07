import { $ } from "@/utils/Dom";

class RestaurantList {
  template() {
    return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list" />
    </section>`;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  updateList(newTemplate: string) {
    const list = $(".restaurant-list");
    list?.replaceChildren();
    list?.insertAdjacentHTML("beforeend", newTemplate);
  }
}

export default new RestaurantList();
