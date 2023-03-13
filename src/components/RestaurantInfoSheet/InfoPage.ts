import categoryKorean from "../../../templates/category-korean.png";
import categoryAsian from "../../../templates/category-asian.png";
import categoryChinese from "../../../templates/category-chinese.png";
import categoryEtc from "../../../templates/category-etc.png";
import categoryJapanese from "../../../templates/category-japanese.png";
import categoryWestern from "../../../templates/category-western.png";
import star from "../../../templates/favorite-icon-filled.png";
import lineStar from "../../../templates/favorite-icon-lined.png";
import { RestaurantData } from "../../domain/RestaurantData";
import { RestaurantType } from "../../Template";
import { $ } from "../../until/ControlDom";
import { RenderRestaurantList } from "../../domain/RenderRestaurantList";

const categoryImg = {
  한식: categoryKorean,
  중식: categoryChinese,
  일식: categoryJapanese,
  양식: categoryWestern,
  아시안: categoryAsian,
  기타: categoryEtc,
};

export const InfoPage = {
  infoPageTemplate() {
    return `
        <dialog class="info-BottomSheet info-BottomSheet--open">
            ${this.buttonTemplate()}
        </dialog>`;
  },

  infoTemplate({
    category,
    name,
    id,
    like,
    takeTime,
    description,
    link,
  }: RestaurantType) {
    return `
            
            <div class="info restaurant__category">
              <img
                  src="${categoryImg[category]}"
                  alt="${category}"
                  class="category-icon"
              />
            </div>
            <img class="info-likeImg" src="${
              like ? star : lineStar
            }" alt="선호되는 가게 여부"/>
            
            <div class="info restaurant-info-name" id=${id}><h2>${name}</h2></div>
            <div class="info restaurant-info-takeTime">
                캠퍼스로부터 ${takeTime}분 내
            </div>
            ${
              description
                ? `<div class="info restaurant-info-description">
                <p>${description}</p>
              </div>`
                : ""
            }
            ${
              link
                ? `<div class="info restaurant-info-link">
                <a href="${link}" target="blank">${link}</a>
              </div>`
                : ""
            }
              
        `;
  },

  buttonTemplate() {
    return `
        <div class="info restaurant-info-button">
            <button class="info-button delete-Restaurant-button">삭제하기</button>
            <button class="info-button cancel-info-BottomSheet-button">닫기</button>
        </div>`;
  },

  showBottomSheet(id: number) {
    const infoBottomSheet = $(".info-BottomSheet") as HTMLDialogElement;
    const restaurantInfoButton = $(".restaurant-info-button") as HTMLElement;

    const restaurantInfoNode = document.createElement("div");
    restaurantInfoNode.className = "restaurant-info";
    restaurantInfoNode.innerHTML = this.infoTemplate(
      RestaurantData.getRestaurant(id)
    );

    infoBottomSheet.insertBefore(restaurantInfoNode, restaurantInfoButton);

    infoBottomSheet.showModal();
  },

  setEvent() {
    const cancelInfoButton = $(".cancel-info-BottomSheet-button");
    const deleteInfoButton = $(".delete-Restaurant-button");

    deleteInfoButton?.addEventListener(
      "click",
      this.deleteInfoRestaurant.bind(this)
    );
    cancelInfoButton?.addEventListener("click", this.closeInfoPage);
  },

  closeInfoPage() {
    const infoBottomSheet = $("dialog") as HTMLDialogElement;
    infoBottomSheet.childNodes[1].remove();
    infoBottomSheet.close();
  },

  deleteInfoRestaurant() {
    const restaurant = $(".restaurant-info-name") as HTMLElement;
    RestaurantData.deleteOneRestaurant(+restaurant?.id);
    this.closeInfoPage();
    RenderRestaurantList.render();
  },
};
