import {
  ADD_BUTTON_PROPS,
  ADD_RESTAURANT_CATEGORY_DROPDOWN_PROPS,
  ADD_RESTAURANT_DISTANCE_DROPDOWN_PROPS,
  CANCEL_BUTTON_PROPS,
} from '../../constant/options';
import RestaurantEntity from '../../domain/entities/RestaurantEntity';
import { $ } from '../../utils/querySelector';
import createButton from '../Common/Button';
import Dropdown from '../Common/Dropdown';
import Modal from './Modal';

const addRestaurantLayout = document.createElement('div');
addRestaurantLayout.innerHTML = /*html*/ `
<h2 class="modal-title text-title">새로운 음식점</h2>
<form id="add-restaurant">
  <div class="form-item form-item--required">
    ${Dropdown(ADD_RESTAURANT_CATEGORY_DROPDOWN_PROPS)}
  </div>

  <div class="form-item form-item--required">
    <label for="name text-caption">이름</label>
    <input type="text" name="name" id="name" required />
  </div>

  <div class="form-item form-item--required">
    ${Dropdown(ADD_RESTAURANT_DISTANCE_DROPDOWN_PROPS)}
  </div>

  <div class="form-item">
    <label for="description text-caption">설명</label>
    <textarea name="description" id="description" cols="30" rows="5"></textarea>
    <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
  </div>

  <div class="form-item">
    <label for="link text-caption">참고 링크</label>
    <input type="text" name="link" id="link" />
    <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
  </div>

  <div class="button-container">
    ${createButton(CANCEL_BUTTON_PROPS)}
    ${createButton(ADD_BUTTON_PROPS)}
  </div>
</form>
`;

class AddRestaurantModal extends Modal {
  constructor() {
    super({ child: addRestaurantLayout });
    this.setEvents();
  }

  createRestaurant() {
    const category = $('#category').value;
    const name = $('#name').value;
    const distance = parseInt($('#distance').value, 10);
    const description = $('#description').value;
    const link = $('#link').value;

    return new RestaurantEntity({
      restaurant: {
        id: category + name,
        category: category,
        name: name,
        distance: distance,
        description: description,
        link: link,
        isFavorite: false,
      },
    });
  }

  setEvents() {}
}

export default AddRestaurantModal;
