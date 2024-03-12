import "./RestaurantAddForm.css";

import BaseComponent from "../../BaseComponent/BaseComponent";

import { ERROR_TARGET_ELEMENTS_DICTIONARY } from "./RestaurantAddForm.constant";

import Restaurant from "../../../domain/Restaurant/Restaurant";
import type { Distance } from "../../../domain/Restaurant/Restaurant.type";

import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";
import { MENU_CATEGORIES } from "../../../constants/menuCategory/menuCategory";
import { ELEMENT_SELECTOR } from "../../../constants/selector";

import { $ } from "../../../utils/dom";
import {
  isUserInputValues,
  isValidErrorMessageKey,
} from "../../../utils/typeGuard";

class RestaurantAddForm extends BaseComponent {
  static DISTANCES_OPTIONS: Distance[] = ["5", "10", "15", "20", "30"];

  private eventListeners = {
    resetForm: {
      eventName: CUSTOM_EVENT_TYPE.resetForm,
      eventHandler: this.handleResetForm.bind(this),
    },

    restaurantAddFormSubmit: {
      eventName: "submit",
      eventHandler: this.handleSubmitAddRestaurant.bind(this),
    },

    modalCancelButtonClick: {
      eventName: "click",
      eventHandler: this.handleCancelButton.bind(this),
    },
  } as const;

  protected render(): void {
    const menuCategoryWithoutAllOptions =
      Object.values(MENU_CATEGORIES).slice(1);

    this.innerHTML = `
        <form id="restaurant-add-form">
            <common-form-item
              for="category"
              classList="form-item--required"
              children="
                ${`<common-dropdown name='category' id='category-select' options='${menuCategoryWithoutAllOptions}' title='선택해 주세요'></common-dropdown>`}
              "
              labelText="카테고리"
            >
            </common-form-item>
            <common-form-item
              for="name"
              classList="form-item--required"
              children="
                ${`<input type='text' name='name' id='name-input' required>`}
              "
              labelText="이름"
            >
            </common-form-item>
            <common-form-item
              for="distance"
              classList="form-item--required"
              children="
                ${`<common-dropdown name='distance' addOptionText='분 내' id='distance-select' options='${RestaurantAddForm.DISTANCES_OPTIONS}' title='선택해 주세요' /></common-dropdown>`}
              "
              labelText="거리(도보 이동 시간)"
            >
            </common-form-item>
            <common-form-item
              for="description"
              children="
                ${`<textarea name='description' id='description-textarea' cols='30' rows='5'></textarea>
                <span class='help-text text-caption'>메뉴 등 추가 정보를 입력해 주세요.</span>`}
              "
              labelText="설명"
            >
            </common-form-item>
            <common-form-item
              for="url"
              children="
                ${`<input type='text' name='url' id='url-input'/>
                <span class='help-text text-caption'>매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>`}
              "
              labelText="참고 링크"
            >
            </common-form-item>
            <div class="button-container">
                <button id="modal-cancel-button" type="button" class="button button--secondary text-caption">취소하기</button>
                <button type="submit" class="button button--primary text-caption">추가하기</button>
            </div>
        </form>
    `;
  }

  protected setEvent(): void {
    this.on({
      ...this.eventListeners.restaurantAddFormSubmit,
      target: document,
    });

    this.on({
      ...this.eventListeners.resetForm,
      target: $(ELEMENT_SELECTOR.restaurantAddForm),
    });

    this.on({
      ...this.eventListeners.modalCancelButtonClick,
      target: $(ELEMENT_SELECTOR.restaurantAddForm),
    });
  }

  private handleResetForm() {
    const formElement = $(ELEMENT_SELECTOR.restaurantAddForm);

    if (formElement instanceof HTMLFormElement) {
      formElement.reset();
    }
  }

  private handleSubmitAddRestaurant(event: Event) {
    try {
      event.preventDefault();

      this.addUserInputRestaurantDetail();

      this.handleResetForm();

      this.emit(CUSTOM_EVENT_TYPE.addRestaurant);

      this.emit(CUSTOM_EVENT_TYPE.restaurantAddModalClose);
    } catch (error: unknown | Error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown | Error) {
    if (error instanceof Error) {
      alert(error.message);

      const errorMessage = error.message;

      if (isValidErrorMessageKey(errorMessage)) {
        const targetElement = $(ERROR_TARGET_ELEMENTS_DICTIONARY[errorMessage]);

        targetElement.focus();
      }
    }
  }

  private addUserInputRestaurantDetail() {
    const userInputRestaurantDetail = this.createFormDataToRestaurantDetail();

    if (userInputRestaurantDetail) {
      const restaurant = new Restaurant();

      restaurant.validateRestaurantDetail(userInputRestaurantDetail);

      restaurant.addRestaurant(userInputRestaurantDetail);
    }
  }

  private createFormDataToRestaurantDetail() {
    const formElement = $(ELEMENT_SELECTOR.restaurantAddForm);

    if (formElement instanceof HTMLFormElement) {
      const formData = new FormData(formElement);

      const userInputValues: Record<string, FormDataEntryValue> = {};

      for (const [key, value] of formData.entries()) {
        userInputValues[key] = value;
      }

      if (isUserInputValues(userInputValues)) return userInputValues;
    }

    return null;
  }

  private handleCancelButton(event: Event) {
    const target = event.target;

    if (
      target instanceof HTMLElement &&
      !target.matches(ELEMENT_SELECTOR.modalCancelButton)
    )
      return;

    this.handleResetForm();

    this.emit(CUSTOM_EVENT_TYPE.restaurantAddModalClose);
  }

  protected removeEvent(): void {
    this.off({
      ...this.eventListeners.restaurantAddFormSubmit,
      target: document,
    });

    this.off({
      ...this.eventListeners.resetForm,
      target: $(ELEMENT_SELECTOR.restaurantAddForm),
    });

    this.off({
      ...this.eventListeners.modalCancelButtonClick,
      target: $(ELEMENT_SELECTOR.restaurantAddForm),
    });
  }
}

customElements.define("restaurant-add-form", RestaurantAddForm);

export default RestaurantAddForm;
