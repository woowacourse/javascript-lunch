import { $ } from "../utils/Dom";

class NavigatorContainer {
  template() {
    return `
    <div class="navigator-container">
    <div class="total-page" data-id="total">모든 음식점</div>
    <div class="bookmark-page" data-id="bookmark">자주 가는 음식점</div>
    </div>
    `;
  }

  initialize(target: Element, navigateToPage: (id: string) => void) {
    this.render(target);
    this.addEvent(navigateToPage);
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  addEvent(navigateToPage: (page: string) => void) {
    $(".navigator-container")?.addEventListener("click", (event) => {
      const target = <HTMLElement>event.target;
      const id = <string>target.closest("div")?.dataset.id;

      if (id) {
        navigateToPage(id);
      }

      if (id === "total") {
        target.classList.add("active");
        const bookmark = $('[data-id="bookmark"]');
        bookmark?.classList.remove("active");
      } else if (id === "bookmark") {
        target.classList.add("active");
        const total = $('[data-id="total"]');
        total?.classList.remove("active");
      }
    });
  }

  closeNavigator(target: HTMLElement) {
    target.remove();
  }
}

export default new NavigatorContainer();
