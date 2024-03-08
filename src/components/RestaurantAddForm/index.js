import {
  CATEGORY_OPTIONS,
  CATEGORY_OPTION_VALUES,
  DISTANCE_OPTIONS,
  DISTANCE_OPTION_VALUES,
} from "../../constants/MenuApp";
import { add } from "../../domains/Restaurants";
import { $ } from "../../utils/dom";
import BaseComponent from "../BaseComponent";

class RestaurantAddForm extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
    <div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="restaurant-add-form">
          <restaurant-option 
          id="category" 
          values="${["", ...CATEGORY_OPTIONS]}" options="${[
      "선택해주세요",
      ...CATEGORY_OPTIONS,
    ]}"></restaurant-option>
          <restaurant-name-input></restaurant-name-input>
          <restaurant-option id="distance" values="${DISTANCE_OPTION_VALUES}" options="${DISTANCE_OPTIONS}"></restaurant-option>

          <div class="form-item">
            <label for="description">설명</label>
            <textarea name="description" id="description" cols="30" rows="5" maxlength="300"></textarea>
            <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
            <p class="hidden" id="error-message">10글자 이하로 작성해주세요</p>
          </div>
          <div class="form-item">
            <label for="link">참고 링크</label>
            <input type="text" name="link" id="link">
            <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>
          <div class="button-container">
            <button type="reset" id="reset-button" class="button button--secondary text-caption">취소하기</button>
            <button type="submit" class="button button--primary text-caption">추가하기</button>
          </div>
        </form>
      </div>
    </div>
    `;
  }

  #getFormData() {
    const formData = new FormData($("#restaurant-add-form"));
    return Object.fromEntries(formData.entries());
  }

  #resetFormData() {
    $("#restaurant-add-form").reset();
  }

  #renderFormModal() {
    $(".modal").classList.add("modal--open");
    document.body.classList.add("stop-scroll");
  }

  #hideFormModal() {
    document.body.classList.remove("stop-scroll");
    $(".modal").classList.remove("modal--open");
  }

  setEvent() {
    document.addEventListener("modal-open", () => {
      this.#renderFormModal();
    });

    $("#restaurant-add-form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.emitEvent("add-form-submit");

      const formData = this.#getFormData();

      try {
        if (add(formData)) {
          this.emitEvent("add-restaurant");
          this.#hideFormModal();
          this.#resetFormData();
        }
      } catch (error) {
        alert(error.message);
      }
    });

    $("#reset-button").addEventListener("click", () => {
      this.#hideFormModal();
    });

    $(".modal-backdrop").addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.#hideFormModal();
      }
    });
  }
}

customElements.define("restaurant-add-form", RestaurantAddForm);
