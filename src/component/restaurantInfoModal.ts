import { CATEGORY_IMAGE, FAVORITE_IMAGE } from "../constant/imageConstant";
import { RestaurantType } from "../type";
import { $ } from "../util/selector";
import { FAVORITE_ALT, LOCAL_STORAGE_KEY } from "../constant";
import { updateRestaurants } from "../domain/filter";
import { preventScroll } from "../domain/newRestaurantModalController";
import { executeEventListener } from "../util/eventListener";
import {
  controlFavoriteIcon,
  controlModalFavoriteIcon,
} from "../domain/favoriteIconController";
const { RESTAURANT } = LOCAL_STORAGE_KEY;

// UI
const renderTemplate = (info: RestaurantType) => {
  return `<div class="modal-backdrop"></div>
  <div id="${info.name}" class="modal-container">
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
    
    <!-- 삭제/닫기 버튼 -->
    <div class="button-container restaurant-info-modal-button">
      <button type="button" class="button button--secondary text-caption">
        삭제하기
      </button>
      <button class="button button--primary text-caption">닫기</button>
    </div>
  </div>
  
  `;
};

export const renderRestaurantInfoModal = (info: RestaurantType) => {
  const restaurantInfoModalElement = $("#restaurant-info-modal") as HTMLElement;

  restaurantInfoModalElement.innerHTML = renderTemplate(info);
};

// Domain
export const initRestaurantInfoModal = () => {
  executeEventListener($(".restaurant-list-container")!, {
    type: "click",
    listener: (event: Event) => {
      controlRestaurantInfoModal(event).bind(event);
      controlModalFavoriteIcon();
      if ((event.target as HTMLElement).className === "favorite-icon") {
        controlFavoriteIcon();
      }
    },
  });
};

export const controlRestaurantInfoModal = (event: Event) => {
  const target = event.target as HTMLImageElement;
  const clickedRestaurantKey = target.closest(".restaurant")!.id;
  const clickedRestaurantInfo = localStorage.getItem(clickedRestaurantKey);

  if (target.classList.value !== "favorite-icon") {
    const body = target.closest("body")!;
    body.style.overflow = "hidden";

    $("#restaurant-info-modal")?.classList.add("modal--open");
    renderRestaurantInfoModal(JSON.parse(String(clickedRestaurantInfo)));
  }

  return controlRestaurantInfoModal;
};

export const closeRestaurantInfoModal = (event: Event) => {
  const target = event.target as HTMLElement;
  const isClosing =
    target.className === "modal-backdrop" ||
    target.classList.contains("button--primary") ||
    target.classList.contains("button--secondary");

  const clickedRestaurantInfoModal = event.currentTarget as HTMLElement;

  if (isClosing) {
    clickedRestaurantInfoModal?.classList.remove("modal--open");
    preventScroll();
  }
};

export const deleteRestaurant = (target: HTMLElement) => {
  if (target.classList.contains("button--secondary")) {
    const restaurantKey = `${RESTAURANT}${
      target.closest(".modal-container")!.id
    }`;

    localStorage.removeItem(restaurantKey);
    updateRestaurants();
    controlFavoriteIcon();
  }
};
