import './style.css';

class RestaurantFormModalInner extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `             
      <h2 class="restaurant-form-modal-title">새로운 음식점</h2>
      <form>
        <!-- 카테고리 -->
        <div class="form-item form-item--required">
          <label for="restaurant-name">카테고리</label>
          <drop-box name="category"></drop-box>
        </div>

        <!-- 음식점 이름 -->
        <div class="form-item form-item--required">
          <label for="restaurant-name">이름</label>
          <custom-input type="text" id="restaurant-name" name="restaurant-name" required></custom-input>
          <error-message-box></error-message-box>
        </div>

        <!-- 거리 -->
        <div class="form-item form-item--required">
          <label for="restaurant-name">거리(도보 이동 시간)</label>
            <drop-box name="distance"></drop-box>
        </div>
        <!-- 설명 -->
        <div class="form-item">
          <label for="restaurant-description">설명</label>
          <custom-textarea
                name="restaurant-description"
                id="restaurant-description"
                cols="30"
                rows="5"
                placeholder="메뉴 등 추가 정보를 입력해 주세요."
              ></custom-textarea>
          <error-message-box></error-message-box>
        </div>

        <!-- 링크 -->
        <div class="form-item">
          <label for="restaurant-link">참고 링크</label>
          <custom-input type="text" id="restaurant-link" name="restaurant-link" placeholder="매장 정보를 확인할 수 있는 링크를 입력해 주세요."></custom-input>
          <error-message-box></error-message-box>
        </div>

        <!-- 취소/추가 버튼 -->
        <div class="button-container">
          <default-btn color="white" text="취소하기" ></default-btn>
          <default-btn color="red" text="추가하기" ></default-btn>
        </div>
      </form>
    `;
  }
}
customElements.define('restaurant-form-inner', RestaurantFormModalInner);
