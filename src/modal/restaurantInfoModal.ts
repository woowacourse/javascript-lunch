import { CATEGORY_IMAGE, FAVORITE_IMAGE } from "../constant/imageConstant";
import { RestaurantType } from "../type";
import { $ } from "../util/selector";
import { FAVORITE_ALT, LOCAL_STORAGE_KEY } from "../constant";
import { updateRestaurantList } from "../domain/filter";
import { preventScroll } from "./newRestaurantModalHandler";
const { RESTAURANT } = LOCAL_STORAGE_KEY;

export const renderTemplate = (info: RestaurantType) => {
  return `<div class="modal-backdrop"></div>
  <div class="modal-container">
    <div class="restaurant__category">
      <img src="./category-${CATEGORY_IMAGE[info.category]}.png" alt="${
    info.category
  }" class="category-icon" />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${info.name}</h3>
      <span class="restaurant__distance text-body">
        캠퍼스부터 ${info.distance}분 내
      </span>
      <img
        src="./favorite-icon-${FAVORITE_IMAGE[info.favorite]}.png"
        alt="${FAVORITE_ALT[info.favorite]}"
        class="favorite-icon"
      />
      <p class="restaurant__description text-body">
      ${info.description}
      </p>
      <p class="restaurant__link text-body">${info.link}</p>
    </div>
  </div>
  
  <!-- 삭제/닫기 버튼 -->
  <div class="button-container restaurant-info-modal-button">
    <button type="button" class="button button--secondary text-caption">
      삭제하기
    </button>
    <button class="button button--primary text-caption">닫기</button>
  </div>`;
};

export const renderRestaurantInfoModal = (info: RestaurantType) => {
  const restaurantInfoModalElement = $("#restaurant-info-modal") as HTMLElement;

  restaurantInfoModalElement.innerHTML = renderTemplate(info);
};

export const closeRestaurantInfoModal = () => {
  const closeButton = [
    $("#restaurant-info-modal > .modal-backdrop"),
    $("#restaurant-info-modal .button--secondary"),
    $("#restaurant-info-modal .button--primary"),
  ];

  closeButton.forEach((button) =>
    button?.addEventListener("click", () => {
      $("#restaurant-info-modal")?.classList.remove("modal--open");
      preventScroll();
    })
  );
};

export const deleteRestaurant = () => {
  $("#restaurant-info-modal .button--secondary")?.addEventListener(
    "click",
    (event: Event) => {
      const target = event.target as HTMLImageElement;

      const restaurantKey = target.closest("div")?.previousElementSibling
        ?.children[1].children[0].textContent as string;

      localStorage.removeItem(`${RESTAURANT}${restaurantKey}`);
      updateRestaurantList();
    }
  );
};
