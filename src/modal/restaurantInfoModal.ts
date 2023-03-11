import { CATEGORY_IMAGE, FAVORITE_IMAGE } from "../constant/imageConstant";
import { RestaurantType } from "../type";
import { $, $$ } from "../util/selector";
import { FAVORITE_ALT, LOCAL_STORAGE_KEY } from "../constant";
import { updateRestaurants } from "../domain/filter";
import { preventScroll } from "./newRestaurantModalHandler";
import { executeEventListener } from "../util/eventListener";
import {
  controlFavoriteIcon,
  controlModalFavoriteIcon,
} from "../domain/favoriteIconController";
const { RESTAURANT } = LOCAL_STORAGE_KEY;

// UI
const renderTemplate = (info: RestaurantType) => {
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

// Domain
export const initRestaurantInfoModal = () => {
  controlFavoriteIcon();

  $$(".restaurant").forEach((restaurant) =>
    executeEventListener(restaurant, {
      type: "click",
      listener: (event) => {
        controlRestaurantInfoModal(event);
        controlModalFavoriteIcon();
      },
    })
  );
};

export const controlRestaurantInfoModal = (event: Event) => {
  const clickedElement = event.currentTarget as HTMLElement;
  const clickedRestaurantKey = `${RESTAURANT}${
    clickedElement.children[1].children[0].textContent as string
  }`;
  const clickedRestaurantInfo = localStorage.getItem(clickedRestaurantKey);
  const target = event.target as HTMLImageElement;

  if (target.classList.value !== "favorite-icon") {
    const body = $("body") as HTMLBodyElement;
    body.style.overflow = "hidden";

    $("#restaurant-info-modal")?.classList.add("modal--open");
    renderRestaurantInfoModal(JSON.parse(String(clickedRestaurantInfo)));
  }

  closeRestaurantInfoModal();
  deleteRestaurant();
};

const closeRestaurantInfoModal = () => {
  const closeButton = [
    $("#restaurant-info-modal > .modal-backdrop"),
    $("#restaurant-info-modal .button--secondary"),
    $("#restaurant-info-modal .button--primary"),
  ];

  closeButton.forEach((button) => {
    executeEventListener(button!, {
      type: "click",
      listener: () => {
        $("#restaurant-info-modal")?.classList.remove("modal--open");
        preventScroll();
        initRestaurantInfoModal();
      },
    });
  });
};

const deleteRestaurant = () => {
  executeEventListener($("#restaurant-info-modal .button--secondary")!, {
    type: "click",
    listener: (event) => {
      const target = event.target as HTMLImageElement;

      const restaurantKey = target.closest("div")?.previousElementSibling
        ?.children[1].children[0].textContent as string;

      localStorage.removeItem(`${RESTAURANT}${restaurantKey}`);
      updateRestaurants();
      initRestaurantInfoModal();
    },
  });
};
