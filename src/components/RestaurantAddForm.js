import { add } from "../domains/Restaurants";
import { $ } from "../utils/dom";
import BaseComponent from "./BaseComponent";

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
            <div class="form-item form-item--required">
              <label for="category text-caption">카테고리</label>
              <select name="category" id="category" required>
                <option value="">선택해 주세요</option>
                <option value="한식">한식</option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="양식">양식</option>
                <option value="아시안">아시안</option>
                <option value="기타">기타</option>
              </select>
            </div>
  
          <div class="form-item form-item--required">
            <label for="name">이름</label>
            <input type="text" name="name" id="name" class="text-caption" required>
          </div>

          <div class="form-item form-item--required">
            <label for="distance">거리(도보 이동 시간)</label>
            <select name="distance" id="distance" required>
              <option value="">선택해주세요</option>
              <option value="5">5분 내</option>
              <option value="10">10분 내</option>
              <option value="15">15분 내</option>
              <option value="20">20분 내</option>
              <option value="30">30분 내</option>
            </select>
 
          </div>

          <div class="form-item">
            <label for="description">설명</label>
            <textarea name="description" id="description" cols="30" rows="5"></textarea>
            <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
          </div>

          <div class="form-item">
            <label for="link">참고 링크</label>
            <input type="text" name="link" id="link">
            <span class="help-text">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>
          <div class="button-container">
            <button type="reset" class="button button--secondary text-caption">취소하기</button>
            <button class="button button--primary text-caption">추가하기</button>
          </div>
        </form>
      </div>
    </div>
    `;
  }

  #resetFormData() {
    $("#restaurant-add-form").reset();
  }

  #getFormData() {
    const formData = new FormData($("#restaurant-add-form"));
    return Object.fromEntries(formData.entries());
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
      const formData = this.#getFormData();
      add(formData);

      this.#hideFormModal();
      this.#resetFormData();
      this.emitEvent("add-restaurant");
    });

    $(".button--secondary").addEventListener("click", () => {
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
