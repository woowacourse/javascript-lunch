import { RestaurantService } from "../../domain/RestaurantService";
import { $, BottomSheetForm, Render } from "../../until/ControlDom";

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
      if (target.className === "list-choose-section") return;

      //무의미한 클릭 이벤트 제거
      if (target.classList.length === 2) return;

      //모든 음식점 클릭
      if (target.classList[0] === "allList") {
        //list like로 토글
        const restaurantListContainer = $(
          ".restaurant-list-container"
        ) as HTMLElement;
        BottomSheetForm.showClose(restaurantListContainer, "show-Like-List");
        console.log(restaurantListContainer);

        //상대 섹션 select 풀기 => css 적용
        target.classList.add("selectList");
        const oppositeSection = $(".likeList") as HTMLElement;
        oppositeSection.className = "likeList";

        // 필터 섹션 보이기
        const filterSection = $(".restaurant-filter-container") as HTMLElement;
        filterSection.style.display = "flex";

        //모든 레스토랑 보이기
        Render.restaurantList(RestaurantService.allList);
        return;
      }

      //선호음식점 클릭
      if (target.classList[0] === "likeList") {
        //list like로 토글
        const restaurantListContainer = $(
          ".restaurant-list-container"
        ) as HTMLElement;
        BottomSheetForm.showClose(restaurantListContainer, "show-Like-List");
        console.log(restaurantListContainer);

        //상대 섹션 select 풀기
        target.classList.add("selectList");
        const oppositeSection = $(".allList") as HTMLElement;
        oppositeSection.className = "allList";

        // 필터 섹션 감추기
        const filterSection = $(".restaurant-filter-container") as HTMLElement;
        filterSection.style.display = "none";
        // 선호 레스토랑 보이기
        Render.restaurantList(RestaurantService.likeList);
      }
    });
  },
};
