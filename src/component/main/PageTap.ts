import { Constants } from "@/constant/Restaurant";
import { HandleWithId, Rerender } from "@/type/type";
import { $, $$ } from "@/utils/Dom";

class PageTap {
  currentChoice: string;

  constructor() {
    this.currentChoice = Constants.EVERY_PAGE;
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

  addEvent(switchPage: HandleWithId, rerenderList: Rerender) {
    $(".page-choice-container")?.addEventListener("click", (e) => {
      const target = <HTMLElement>e.target;
      const targetPage = <string>target.closest("div")?.dataset.id;

      if (this.currentChoice !== targetPage) {
        this.currentChoice = targetPage;

        this.toggleFocus();
        switchPage(targetPage);
        rerenderList();
      }
    });
  }

  toggleFocus() {
    $$(".choice").forEach((choice) => {
      choice.classList.toggle("page-chosen");
    });
  }
}

export default new PageTap();
