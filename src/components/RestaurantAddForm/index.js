import {
  CATEGORY_OPTIONS,
  DISTANCE_OPTIONS,
  DISTANCE_OPTION_VALUES,
} from "../../constants/MenuApp";
import { add } from "../../domains/Restaurants";
import { $ } from "../../utils/dom";
import { removeHTMLTags } from "../../utils/removeHtmlTag";
import BaseModal from "../common/BaseModal";

class RestaurantAddForm extends BaseModal {
  #restaurantAddForm;

  constructor() {
    super();
    this.#restaurantAddForm = $("#restaurant-add-form");
  }

  render() {
    this.innerHTML = `
      <base-modal modalId="addForm">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="restaurant-add-form">
          <restaurant-option
            id="category"
            values="${["", ...CATEGORY_OPTIONS]}"
            options="${["선택해주세요", ...CATEGORY_OPTIONS]}"
          ></restaurant-option>
          <restaurant-name-input></restaurant-name-input>
          <restaurant-option
            id="distance"
            values="${DISTANCE_OPTION_VALUES}"
            options="${DISTANCE_OPTIONS}"
          ></restaurant-option>

          <div class="form-item">
            <label for="description">설명</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="5"
              maxlength="300"
            ></textarea>
            <span class="help-text text-caption"
              >메뉴 등 추가 정보를 입력해 주세요.</span
            >
            <p class="hidden" id="error-message">10글자 이하로 작성해주세요</p>
          </div>
          <div class="form-item">
            <label for="link">참고 링크</label>
            <input type="text" name="link" id="link" />
            <span class="help-text text-caption"
              >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
            >
          </div>
          <div class="button-container">
          <button
          type="reset"
          id="reset-button"
          class="button button--secondary text-caption"
        >
          취소하기
        </button>
        <button type="submit" class="button button--primary text-caption">
          추가하기
        </button>
        </div>

        </form>
      </base-modal>
      
    `;
  }

  #getFormData() {
    const formData = new FormData(this.#restaurantAddForm);
    return Object.fromEntries(formData.entries());
  }

  #resetFormData() {
    this.#restaurantAddForm.reset();
  }

  setEvent() {
    this.#restaurantAddForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.emitEvent("add-form-submit");

      const formData = this.#getFormData();
      formData.name = removeHTMLTags(formData.name);

      try {
        if (add(formData)) {
          this.emitEvent("add-restaurant");
          this.#resetFormData();
          this.modalClose(".addForm");
        }
      } catch (error) {
        alert(error.message);
      }
    });

    $("#reset-button").addEventListener("click", (e) => {
      this.#resetFormData();
      this.modalClose(".addForm");
    });
  }
}

customElements.define("restaurant-add-form", RestaurantAddForm);
