import { CATEGORY, SELECT_DISTANCE } from '../constants';
import { IRestaurant } from '../domain/Restaurant';
import { closeModal } from '../modal';
import Select from './Select';
import { CategoryOptions, DistanceTime } from '../types/type';
import { arrayElementToObject } from '../utils/util';

export default function RestaurantForm(
  addRestaurantInfo: (restaurantInfo: IRestaurant) => void
) {
  const $formContainer = document.createElement('div');
  const $form = document.createElement('form');

  const handleFormCancel = () => {
    closeModal();
  };

  const handleFormSubmit = (
    event: Event,
    addRestaurantInfo: (restaurantInfo: IRestaurant) => void
  ) => {
    event.preventDefault();
    const { target } = event;

    if (!target) return null;

    const restaurantInfo = getFormDatas();

    addRestaurantInfo(restaurantInfo);

    $form.reset();
    closeModal();
  };

  const getFormDatas = (): IRestaurant => {
    const category = $form.querySelector('#category') as HTMLSelectElement;
    const name = $form.querySelector('#name') as HTMLInputElement;
    const distance = $form.querySelector('#distance') as HTMLSelectElement;
    const description = $form.querySelector(
      '#description'
    ) as HTMLTextAreaElement;
    const link = $form.querySelector('#link') as HTMLInputElement;

    return {
      id: Date.now(),
      category: category.value as CategoryOptions,
      name: name.value ?? '',
      distance: Number(distance.value) as DistanceTime,
      description: description.value ?? '',
      link: link.value ?? '',
      isFavorite: false,
    };
  };

  $formContainer.innerHTML = `<h2 class="modal-title text-title">새로운 음식점</h2>`;
  $form.innerHTML = RestaurantFormTemplate();
  $formContainer.appendChild($form);

  $formContainer.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLElement)) return;
    const { type } = e.target.dataset;

    if (type === 'submit') handleFormSubmit(e, addRestaurantInfo);
    if (type === 'cancel') handleFormCancel();
  });

  return $formContainer;
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
      <button data-type="cancel" type="button" class="button button--secondary text-caption" aria-label='submit-cancel'>취소하기</button>
      <button data-type="submit" type='submit'class="button button--primary text-caption" aria-label='submit-form'>추가하기</button>
    </div>
  `;
}
