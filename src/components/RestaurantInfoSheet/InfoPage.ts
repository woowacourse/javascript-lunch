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
import { RestaurantList } from "../MainPage/RestaurantList";

const categoryCountry = {
  한식: categoryKorean,
  중식: categoryChinese,
  일식: categoryJapanese,
  양식: categoryWestern,
  아시안: categoryAsian,
  기타: categoryEtc,
};

export const InfoPage = {
  template() {
    return `
        <dialog class="info-BottomSheet info-BottomSheet--open">
            ${this.buttonTemplate()}
        </dialog>`;
  },

  infoTemplate(restaurant: RestaurantType) {
    return `
            <div>
                
                <div class="info restaurant__category">
                <img
                    src="${categoryCountry[restaurant.category]}"
                    alt="${restaurant.category}"
                    class="category-icon"
                />
                </div>
                <img class="info-likeImg" src="${
                  restaurant.like ? star : lineStar
                }" alt="선호되는 가게 여부"/>
                
                <div class="info restaurant-info-name" id=${
                  restaurant.id
                }><h2>${restaurant.name}</h2></div>
                <div class="info restaurant-info-takeTime">
                    캠퍼스로부터 ${restaurant.takeTime}분 내
                </div>
                <div class="info restaurant-info-description">
                    <p>${restaurant.description}</p>
                </div>
                <div class="info restaurant-info-link">
                    <a href="${restaurant.link}" target="blank">${
      restaurant.link
    }</a>
                </div>
            </div>
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
    const infoBottomSheet = $("dialog") as HTMLDialogElement;
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

    cancelInfoButton?.addEventListener("click", () => this.closeInfoPage());
    deleteInfoButton?.addEventListener("click", () =>
      this.deleteInfoRestaurant()
    );
  },
  closeInfoPage() {
    const infoBottomSheet = $("dialog") as HTMLDialogElement;
    infoBottomSheet.childNodes[1].remove();
    infoBottomSheet.close();
  },

  deleteInfoRestaurant() {
    const restaurant = $(".restaurant-info-name");
    RestaurantData.deleteRestaurant(+restaurant?.id!);
    this.closeInfoPage();
    RestaurantList.renderRestaurantList();
  },
};
