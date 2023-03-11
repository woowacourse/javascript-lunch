import styleClass from "../../constants/styleClass";
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
        <h2 class="${styleClass.modal.title} ${styleClass.text.title}">새로운 음식점</h2>
        <form id="restaurantForm">

          <div class="${styleClass.form.item} ${styleClass.form.itemRequired}">
            <label for="category ${styleClass.text.caption}">카테고리</label>
            <select name="category" id="category" required>
              <option value="">선택해 주세요</option>
              ${categoryOptions()}
            </select>
          </div>

          <div class="${styleClass.form.item} ${styleClass.form.itemRequired}">
            <label for="name ${styleClass.text.caption}">이름</label>
            <input type="text" name="name" id="name" required>
          </div>

          <div class="${styleClass.form.item} ${styleClass.form.itemRequired}">
            <label for="distance ${styleClass.text.caption}">거리(도보 이동 시간) </label>
            <select name="distance" id="distance" required>
              <option value="">선택해 주세요</option>
                ${distanceOptions()}
            </select>
          </div>

          <div class="${styleClass.form.item}">
            <label for="description ${styleClass.text.caption}">설명</label>
            <textarea name="description" id="description" cols="30" rows="5"></textarea>
            <span class="${styleClass.text.help} ${styleClass.text.caption}">메뉴 등 추가 정보를 입력해 주세요.</span>
          </div>

          <div class="${styleClass.form.item}">
            <label for="link ${styleClass.text.caption}">참고 링크</label>
            <input type="text" name="link" id="link">
            <span class="${styleClass.text.help} ${styleClass.text.caption}">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>

          <div class="button-container">
            <button id="cancelButton" type="button" class="button ${styleClass.button.secondary} ${styleClass.text.caption}">취소하기</button>
            <button type="submit" class="button ${styleClass.button.primary} ${styleClass.text.caption}">추가하기</button>
          </div>
        </form>
      `;
  }
}

export default AddRestaurant;
