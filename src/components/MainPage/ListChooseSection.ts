import { RenderRestaurantList } from "../../domain/RenderRestaurantList";
import { $, ControlDom } from "../../until/ControlDom";

export const ListChooseSection = {
  template() {
    return `
    <div class="list-choose-section">
        <div class="allList selectList">모든 음식점</div>
        <div class="likeList ">자주 가는 음식점</div>
    </div>`;
  },

  setEvent() {
    const listChooseSection = $(".list-choose-section");
    listChooseSection?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      this.targetValidation(target) &&
        this.transSection(target, target.classList[0]);
    });
  },

  targetValidation(elem: HTMLElement) {
    return elem.className !== "list-choose-section";
  },

  transSection(target: HTMLElement, selectListClass: string) {
    const oppositeList =
      selectListClass === "likeList" ? "allList" : "likeList";

    ControlDom.showClose(
      $(".restaurant-list-container") as HTMLElement,
      "show-Like-List"
    );
    ControlDom.showClose(
      $(".restaurant-filter-container") as HTMLElement,
      "show-filter"
    );

    target.classList.add("selectList");
    const oppositeSection = $(`.${oppositeList}`) as HTMLElement;
    oppositeSection.className = oppositeList;

    RenderRestaurantList.render();
  },
};
