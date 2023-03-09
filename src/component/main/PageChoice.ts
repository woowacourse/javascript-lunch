import { HandleWithId } from "@/type/type";
import { $, $$ } from "@/utils/Dom";

class PageChoice {
  currentChoice: string;

  constructor() {
    this.currentChoice = "every";
  }

  template() {
    return `
    <div class="page-choice-container">
      <div class="every-page choice text-page page-chosen" data-id="every">모든 음식점</div>
      <div class="bookmarked-page choice text-page" data-id="bookmarked">자주 가는 음식점</div>
    </div> 
    `;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  addEvent(switchPage: HandleWithId) {
    $(".page-choice-container")?.addEventListener("click", (e) => {
      const target = <HTMLElement>e.target;
      const targetPage = <string>target.closest("div")?.dataset.id;

      if (this.currentChoice !== targetPage) {
        this.currentChoice = targetPage;
        this.toggleFocus();
        switchPage(targetPage);
      }
    });
  }

  toggleFocus() {
    $$(".choice").forEach((choice) => {
      choice.classList.toggle("page-chosen");
    });
  }
}

export default new PageChoice();
