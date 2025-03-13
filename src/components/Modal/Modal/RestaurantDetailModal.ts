import "./RestaurantDetailModal.css";
import { Restaurant } from "../../../../types/restaurant";
import { IMAGE_SRC_BY_RESTAURANTS_CATEGORY } from "../../../constants/constants";

export default class RestaurantDetailModal {
  restaurant;
  modalElement;
  closeButton;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
    this.modalElement = document.getElementById(
      "restaurant-detail-dialog"
    ) as HTMLDialogElement;
    this.addRestaurantDetail();
    this.closeButton = document.querySelector(
      ".detail-close-button"
    ) as HTMLButtonElement;

    this.addEventListeners();
  }

  addRestaurantDetail() {
    const addRestaurantDetail = document.querySelector(
      "#detail-modal-container"
    ) as HTMLElement;

    const { category, name, distance, description, link } = this.restaurant;
    const mappedImage =
      IMAGE_SRC_BY_RESTAURANTS_CATEGORY[category] || "images/default.png";
    addRestaurantDetail.innerHTML = `<div class="restaurant__category">
            <img class="category-icon" src="${mappedImage}" />
          </div>
          <div class="detail-restaurant__info">
            <h3 class="detail-restaurant__name text-title">${name}</h3>
            <span class="detail-restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="detail-restaurant__description text-body">${description}</p>
            <a class="detail-restaurant__link" href="${link}">${link}</a>
          </div>
          <div class="detail-button-box">
            <button type="button" class="button detail-delete-button">
              삭제하기
            </button>
            <button type="button" class="button detail-close-button">
              닫기
            </button>
          </div>`;
  }

  open() {
    this.modalElement.showModal();
  }

  close() {
    this.modalElement.close();
  }

  addEventListeners() {
    this.closeButton.addEventListener("click", () => this.close());

    this.modalElement.addEventListener("click", (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#detail-modal-container")) {
        this.close();
      }
    });
  }
}

// 클릭하면 모달 띄우기
// 모달 안에는
// 이미지
// 식당 이름
// 거리
// 설명
// 링크
// 삭제하기 닫기

// renderRestaurantElement : 각 li.restaurant 요소를 생성하여 RestaurantList에 반환
// RestaurantList : 음식점 데이터를 가져와 RestaurantItem을 생성하고 화면에 출력하는 역할
