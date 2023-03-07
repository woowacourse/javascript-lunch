import { CATEGORY_OPTIONS, SELECT_DISTANCE } from '../constants';
import { closeModal } from '../modal';
import selectTemplate from '../template/selectTemplate';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { arrayElementToObject } from '../utils/util';

export default function RestaurantForm($root) {
  const $form = document.createElement('form');

  this.render = () => {
    $form.innerHTML = `
      ${RestaurantFormTemplate()}
    `;
  };

  this.init = () => {
    $root.innerHTML = '<h2 class="modal-title text-title">새로운 음식점</h2>';
    this.render();

    $form.addEventListener('submit', handleFormSubmit);

    const $cancelButton = $form.querySelector('#cancel-button');
    $cancelButton.addEventListener('click', handleFormCancel);

    $root.appendChild($form);
  };

  this.init();
}

const handleFormSubmit = (event) => {
  event.preventDefault();

  const category = event.target.querySelector('#category').value;
  const name = event.target.querySelector('#name').value;
  const distance = event.target.querySelector('#distance').value;
  const description = event.target.querySelector('#description').value;
  const link = event.target.querySelector('#link').value;

  const restaurantInfo = {
    category,
    name,
    distance: Number(distance),
  };

  if (description !== '') restaurantInfo.description = description;
  if (link !== '') restaurantInfo.URLlink = link;

  this.state.restaurantService.addRestaurant(restaurantInfo);

  filterRestaurantList(this.state.filters.state.category, this.state.filters.state.filter);

  const localRestaurants = getLocalStorage('restaurants') ?? [];
  setLocalStorage('restaurants', [...localRestaurants, restaurantInfo]);

  closeModal();
};

const handleFormCancel = () => {
  closeModal();
};

function RestaurantFormTemplate() {
  return `
    <div class="form-item form-item--required">
      <label for="category text-caption">카테고리</label>
      ${selectTemplate({
        name: 'category',
        id: 'category',
        options: [{ value: '', text: '선택해주세요' }, ...arrayElementToObject(CATEGORY_OPTIONS)],
        required: true,
      })}
    </div>

    <!-- 음식점 이름 -->
    <div class="form-item form-item--required">
      <label for="name text-caption">이름</label>
      <input type="text" name="name" id="name" required>
    </div>

    <!-- 거리 -->
    <div class="form-item form-item--required">
      <label for="distance text-caption">거리(도보 이동 시간) </label>
      ${selectTemplate({
        name: 'distance',
        id: 'distance',
        options: SELECT_DISTANCE,
        required: true,
      })}
    </div>

    <!-- 설명 -->
    <div class="form-item">
      <label for="description text-caption">설명</label>
      <textarea name="description" id="description" cols="30" rows="5"></textarea>
      <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
    </div>

    <!-- 링크 -->
    <div class="form-item">
      <label for="link text-caption">참고 링크</label>
      <input type="text" name="link" id="link">
      <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
    </div>

    <!-- 취소/추가 버튼 -->
    <div class="button-container">
      <button id="cancel-button" type="button" class="button button--secondary text-caption">취소하기</button>
      <button class="button button--primary text-caption">추가하기</button>
    </div>
  `;
}
