import { ADD_RESTAURANT_CATEGORY_DROPDOWN_PROPS, ADD_RESTAURANT_DISTANCE_DROPDOWN_PROPS } from '../../constant/options';
import Button from '../Common/Button';
import Dropdown from '../Common/Dropdown';
import Modal from '../Modal/Modal';

const addingModalLayout = document.createElement('div');

addingModalLayout.innerHTML = /*html*/ `
<h2 class="modal-title text-title">새로운 음식점</h2>
<form class="form-add-restaurant">
  <div class="form-item form-item--required">
    <label for="category" class="text-caption">카테고리</label>
    ${Dropdown(ADD_RESTAURANT_CATEGORY_DROPDOWN_PROPS)}
    </div>

  <div class="form-item form-item--required">
    <label for="name text-caption">이름</label>
    <input type="text" name="name" id="name" required>
  </div>

  <div class="form-item form-item--required">
    <label for="distance" class="text-caption">거리(도보 이동 시간)</label>
    ${Dropdown(ADD_RESTAURANT_DISTANCE_DROPDOWN_PROPS)}
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
    ${Button('reset', 'secondary', '취소하기')}
    ${Button('submit', 'primary', '추가하기')}
  </div>
</form>`;

class AddingRestaurantModal extends Modal {
  constructor() {
    super({ child: addingModalLayout });
  }
}

export default AddingRestaurantModal;
