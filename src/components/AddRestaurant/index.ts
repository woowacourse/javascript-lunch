import { categoryOptions, distanceOptions } from "../../domain/restaurant";
import {
  onClickCancelButton,
  onSubmitRestaurantForm,
} from "./handleAddRestaurant";

class AddRestaurant extends HTMLElement {
  constructor() {
    super();
    this.render();
    onClickCancelButton();
    onSubmitRestaurantForm();
  }

  render() {
    this.innerHTML = `
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="restaurantForm">

          <div class="form-item form-item--required">
            <label for="category text-caption">카테고리</label>
            <select name="category" id="category" required>
              <option value="">선택해 주세요</option>
              ${categoryOptions()}
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
                ${distanceOptions()}
            </select>
          </div>

          <div class="form-item">
            <label for="description text-caption">설명</label>
            <textarea name="description" id="description" cols="30" rows="5"></textarea>
            <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
          </div>

          <div class="form-item">
            <label for="link text-caption">참고 링크</label>
            <input type="text" name="link" id="link">
            <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>

          <div class="button-container">
            <button id="cancelButton" type="button" class="button button--secondary text-caption">취소하기</button>
            <button type="submit" class="button button--primary text-caption">추가하기</button>
          </div>
        </form>
      `;
  }
}

export default AddRestaurant;
