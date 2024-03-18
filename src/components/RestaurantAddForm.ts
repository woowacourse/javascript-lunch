const RestaurantAddForm = () => {
  return `<h2 class="modal-title text-title">새로운 음식점</h2>
  <form class="modal-form">
      <div class="form-item form-item--required">
          <label for="category text-caption">카테고리</label>
          <filter-box type="modalCategory" class="modal-category" ></filter-box>
          <p class="modal-category-error-message"></p>
      </div>
      <div class="form-item form-item--required">
          <label for="name text-caption">이름</label>
          <input class="modal-restaurant-name" type="text" name="name" id="name" />
          <p class="modal-restaurant-name-error-message"></p>
      </div>
      <div class="form-item form-item--required">
          <label for="distance text-caption">거리(도보 이동 시간)</label>
          <filter-box type="modalDistance" class="modal-distance" ></filter-box>
          <p class="modal-distance-error-message"></p>
      </div>
      <div class="form-item">
          <label for="description text-caption">설명</label>
          <textarea name="description" class="modal-description" id="description" cols="30" rows="5"></textarea>
          <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
      </div>
      <div class="form-item">
          <label for="link text-caption">참고 링크</label>
          <input type="text" name="reference" class="modal-reference" id="reference" />
          <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          <p class="modal-reference-error-message"></p>
      </div>
      <div class="button-container">
          <button type="button" class="button button--secondary text-caption">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
      </div>
  </form>
  `;
};

export default RestaurantAddForm;
