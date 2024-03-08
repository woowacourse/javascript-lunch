import { add } from "../../domains/Restaurants";
import { $ } from "../../utils/dom";
import BaseComponent from "../BaseComponent";

const RESTAURANT_ADD_VALUES = [
  "",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];
const RESTAURANT_ADD_CATEGORY = [
  "선택해주세요",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];

const RESTAURANT_ADD_DISTANCE = [
  "선택해주세요",
  "5분 내",
  "10분 내",
  "15분 내",
  "20분 내",
  "30분 내",
];

const RESTAURANT_ADD_DISTANCE_VALUE = ["", "5", "10", "15", "20", "30"];

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
          <restaurant-option id="category" values="${RESTAURANT_ADD_VALUES}" options="${RESTAURANT_ADD_CATEGORY}"></restaurant-option>
          <restaurant-name-input></restaurant-name-input>
          <restaurant-option id="distance" values="${RESTAURANT_ADD_DISTANCE_VALUE}" options="${RESTAURANT_ADD_DISTANCE}"></restaurant-option>

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

      console.log("formData", formData);

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
