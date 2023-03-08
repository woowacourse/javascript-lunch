import CustomElement from "../../abstracts/CustomElement";
import dispatcher from "../../domain/Dispatcher";
import { RESTAURANT_ACTION } from "../../abstracts/constants";

class RestaurantAddFormComponent extends CustomElement {
  handleEvent() {
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", (event) => this.addRestaurant(event));

    this.shadowRoot
      .querySelector(".button--secondary")
      .addEventListener("click", () => dispatcher("modal_off"));
  }

  addRestaurant(event) {
    event.preventDefault();
    const category = this.shadowRoot.querySelector("#category").value;
    const name = this.shadowRoot.querySelector("#name").value;
    const distance = this.shadowRoot.querySelector("#distance").value;
    const description = this.shadowRoot.querySelector("#description").value;
    const link = this.shadowRoot.querySelector("#link").value;
    const isFavorite = false;

    const restaurant = {
      category,
      name,
      distance,
      description,
      link,
      isFavorite,
    };

    dispatcher(RESTAURANT_ACTION.ADD_RESTAURANT, restaurant);
    dispatcher("modal_off");

    this.shadowRoot.querySelector("form").reset();
  }

  template() {
    return `
        <style>
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }

          :host {
            display: block;
            height: 90vh;
            width: 100%;
            overflow-y: scroll;
            padding: 32px 16px !important;
          }

          .modal-title {
            margin-bottom: 36px;
          }

          .text-title {
            font-size: 20px;
            line-height: 24px;
            font-weight: 600;
          }
          
          .form-item {
            display: flex;
            flex-direction: column;
          
            margin-bottom: 36px;
          }
          
          .form-item label {
            color: var(--grey-400);
            font-size: 14px;
          }
          
          .form-item--required label::after {
            padding-left: 4px;
          
            color: var(--primary-color);
            content: "*";
          }
          
          .form-item .help-text {
            color: var(--grey-300);
          }
          
          .form-item input,
          .form-item textarea,
          .form-item select {
            padding: 8px;
            margin: 6px 0;
          
            border: 1px solid var(--grey-200);
            border-radius: 8px;
          
            font-size: 16px;
          }
          
          .form-item textarea {
            resize: none;
          }
          
          .form-item select {
            height: 44px;
          
            padding: 8px;
          
            border: 1px solid var(--grey-200);
            border-radius: 8px;
          
            color: var(--grey-300);
          }
          
          input[name="name"],
          input[name="link"] {
            height: 44px;
          }
          
          .button-container {
            display: flex;
          }
          
          .button {
            width: 100%;
            height: 44px;
          
            margin-right: 16px;
          
            border: none;
            border-radius: 8px;
          
            font-weight: 600;
            cursor: pointer;
          }
          
          .button:last-child {
            margin-right: 0;
          }

          .button--secondary {
            border: 1px solid var(--grey-300);
            background: transparent;
          
            color: var(--grey-300);
          }
          
          .button--primary {
            background: var(--primary-color);
          
            color: var(--grey-100);
          }      

          .text-caption {
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;
          }
        </style>
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form>
            <!-- 카테고리 -->
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

            <!-- 음식점 이름 -->
            <div class="form-item form-item--required">
              <label for="name text-caption">이름</label>
              <input type="text" name="name" id="name" required />
            </div>

            <!-- 거리 -->
            <div class="form-item form-item--required">
              <label for="distance text-caption">거리(도보 이동 시간) </label>
              <select name="distance" id="distance" required>
                <option value="">선택해 주세요</option>
                <option value="5">5분 내</option>
                <option value="10">10분 내</option>
                <option value="15">15분 내</option>
                <option value="20">20분 내</option>
                <option value="30">30분 내</option>
              </select>
            </div>

            <!-- 설명 -->
            <div class="form-item">
              <label for="description text-caption">설명</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
              ></textarea>
              <span class="help-text text-caption"
                >메뉴 등 추가 정보를 입력해 주세요.</span
              >
            </div>

            <!-- 링크 -->
            <div class="form-item">
              <label for="link text-caption">참고 링크</label>
              <input type="text" name="link" id="link" />
              <span class="help-text text-caption"
                >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
              >
            </div>

            <!-- 취소/추가 버튼 -->
            <div class="button-container">
              <button type="button" class="button button--secondary text-caption">취소하기</button>
              <button type="submit" class="button button--primary text-caption">추가하기</button>
            </div>
          </form>
        `;
  }
}

customElements.define("restaurant-add-form", RestaurantAddFormComponent);

export default RestaurantAddFormComponent;
