import { CATEGORY, SELECT_DISTANCE } from '../constants';
import { IRestaurant } from '../domain/Restaurant';
import { closeModal } from '../modal';
import Select from './Select';
import { CategoryOptions, DistanceTime } from '../types/type';
import { arrayElementToObject } from '../utils/util';

export default class RestaurantForm {
  $form = document.createElement('form');

  constructor(
    $root: HTMLElement,
    addRestaurantInfo: (restaurantInfo: IRestaurant) => void
  ) {
    $root.innerHTML = '<h2 class="modal-title text-title">새로운 음식점</h2>';
    this.render();

    this.$form.addEventListener('submit', (e) =>
      this.handleFormSubmit(e, addRestaurantInfo)
    );
    const $cancelButton = this.$form.querySelector(
      '#cancel-button'
    ) as HTMLButtonElement;
    $cancelButton.addEventListener('click', this.handleFormCancel);

    $root.appendChild(this.$form);
  }

  render = () => {
    this.$form.innerHTML = `
      ${RestaurantFormTemplate()}
    `;
  };

  handleFormSubmit = (
    event: SubmitEvent,
    addRestaurantInfo: (restaurantInfo: IRestaurant) => void
  ) => {
    event.preventDefault();
    const { target } = event;

    if (!target) return null;

    const restaurantInfo = this.getFormDatas();

    addRestaurantInfo(restaurantInfo);

    this.$form.reset();
    closeModal();
  };

  getFormDatas(): IRestaurant {
    const category = this.$form.querySelector('#category') as HTMLSelectElement;
    const name = this.$form.querySelector('#name') as HTMLInputElement;
    const distance = this.$form.querySelector('#distance') as HTMLSelectElement;
    const description = this.$form.querySelector(
      '#description'
    ) as HTMLTextAreaElement;
    const link = this.$form.querySelector('#link') as HTMLInputElement;

    return {
      category: category.value as CategoryOptions,
      name: name.value ?? '',
      distance: Number(distance.value) as DistanceTime,
      description: description.value ?? '',
      link: link.value ?? '',
    };
  }

  handleFormCancel = () => {
    closeModal();
  };
}

function RestaurantFormTemplate() {
  return `
    <div class="form-item form-item--required">
      <label for="category text-caption">카테고리</label>
      ${Select({
        name: 'category',
        id: 'category',
        options: [
          { value: '', text: '선택해주세요' },
          ...arrayElementToObject([...CATEGORY]),
        ],
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
      ${Select({
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
