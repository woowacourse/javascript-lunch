import { RestaurantData } from "../../domain/RestaurantData";
import { $, BottomSheetForm } from "../../until/ControlDom";
import { RestaurantList } from "./RestaurantList";

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

      //무의미한 클릭 이벤트 제거
      if (target.className === "list-choose-section") return;
      if (target.classList.length === 2) return;

      this.transSection(target, target.classList[0]);
    });
  },

  transSection(target: HTMLElement, ListClass: string) {
    const oppositeList = ListClass === "likeList" ? "allList" : "likeList";

    BottomSheetForm.showClose(
      $(".restaurant-list-container") as HTMLElement,
      "show-Like-List"
    );
    BottomSheetForm.showClose(
      $(".restaurant-filter-container") as HTMLElement,
      "show-filter"
    );

    target.classList.add("selectList");
    const oppositeSection = $(`.${oppositeList}`) as HTMLElement;
    oppositeSection.className = oppositeList;

    RestaurantList.renderRestaurantList();
  },
};
