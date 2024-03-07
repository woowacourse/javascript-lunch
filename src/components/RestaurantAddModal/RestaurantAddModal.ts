import "./RestaurantAddModal.css";

import BaseComponent from "../BaseComponent/BaseComponent";

import Restaurant from "../../domain/Restaurant/Restaurant";
import {
  Distance,
  RestaurantDetail,
} from "../../domain/Restaurant/Restaurant.type";

import { OPTION_ELEMENT_REGEXP } from "./RestaurantAddModal.constant";

import { $ } from "../../utils/dom";
import { createOptionElements } from "../../utils/createOptionElements";

import { CUSTOM_EVENT_TYPE } from "../../constants/eventType";
import { MENU_CATEGORIES } from "../../constants/menuCategory/menuCategory";
import { ELEMENT_SELECTOR } from "../../constants/selector";
import { CustomEventListenerDictionary } from "../BaseComponent/BaseComponent.type";

class RestaurantAddModal extends BaseComponent {
  static DISTANCES_OPTIONS: Distance[] = [5, 10, 15, 20, 30];

  private eventListeners: CustomEventListenerDictionary = {
    modalCancelButtonClick: {
      eventName: "click",
      eventHandler: this.handleCancelButton.bind(this),
    },

    restaurantAddFormSubmit: {
      eventName: "submit",
      eventHandler: this.handleSubmitAddRestaurant.bind(this),
    },
  };

  protected render(): void {
    this.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-container">
            <h2 class="modal-title text-title">새로운 음식점</h2>
            <form id="restaurant-add-form">
                <div class="form-item form-item--required">
                    <label for="category text-caption">카테고리</label>
                    <select name="category" id="category" required>
                      <option value="">선택해 주세요</option>
                      ${createOptionElements(
                        Object.values(MENU_CATEGORIES).slice(1)
                      )}
                    </select>
                </div>

                <div class="form-item form-item--required">
                    <label for="name text-caption">이름</label>
                    <input type="text" name="name" id="name" required>
                </div>

                <div class="form-item form-item--required">
                    <label for="distance text-caption">거리(도보 이동 시간) </label>
                    <select name="distance" id="distance" required>
                    <option value="">선택해 주세요</option>
                    ${createOptionElements(
                      RestaurantAddModal.DISTANCES_OPTIONS
                    ).replace(
                      OPTION_ELEMENT_REGEXP,
                      (_, value) =>
                        `<option value=${value}>${value}분 내</option>`
                    )}
                    </select>
                </div>

                <div class="form-item">
                    <label for="description text-caption">설명</label>
                    <textarea name="description" id="description" cols="30" rows="5"></textarea>
                    <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
                </div>

                <div class="form-item">
                    <label for="url" text-caption">참고 링크</label>
                    <input type="text" name="url" id="url"/>
                    <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
                </div>

                <div class="button-container">
                    <button id="modal-cancel-button" type="button" class="button button--secondary text-caption">취소하기</button>
                    <button type="submit" class="button button--primary text-caption">추가하기</button>
                </div>
            </form>
        </div>
    `;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.modalCancelButtonClick,
      target: $(ELEMENT_SELECTOR.modalCancelButton),
    });

    this.on({
      ...this.eventListeners.restaurantAddFormSubmit,
      target: $(ELEMENT_SELECTOR.restaurantAddForm),
    });
  }

  private handleCancelButton() {
    this.handleCloseModal();

    this.resetForm();
  }

  private handleCloseModal() {
    this.classList.remove("modal--open");
  }

  private resetForm() {
    const formElement = $(ELEMENT_SELECTOR.restaurantAddForm);

    if (formElement instanceof HTMLFormElement) {
      formElement.reset();
    }
  }

  private handleSubmitAddRestaurant(event: Event) {
    event.preventDefault();

    this.addUserInputRestaurantDetail();

    this.resetForm();

    this.handleCloseModal();

    this.emit(CUSTOM_EVENT_TYPE.addRestaurant);
  }

  private addUserInputRestaurantDetail() {
    const userInputRestaurantDetail = this.createFormDataToRestaurantDetail();

    if (userInputRestaurantDetail) {
      const restaurant = new Restaurant();
      restaurant.addRestaurant(userInputRestaurantDetail);
    }
  }

  private createFormDataToRestaurantDetail() {
    let formData = null;

    const formElement = $(ELEMENT_SELECTOR.restaurantAddForm);

    if (formElement instanceof HTMLFormElement) {
      formData = new FormData(formElement);

      const userInputValues: Record<string, FormDataEntryValue> = {};

      for (const [key, value] of formData.entries()) {
        userInputValues[key] = value;
      }

      return userInputValues as unknown as RestaurantDetail;
    }

    return null;
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.modalCancelButtonClick,
      target: $(ELEMENT_SELECTOR.modalCancelButton),
    });

    this.off({
      ...this.eventListeners.restaurantAddFormSubmit,
      target: $(ELEMENT_SELECTOR.restaurantAddForm),
    });
  }
}

customElements.define("restaurant-add-modal", RestaurantAddModal);

export default RestaurantAddModal;
