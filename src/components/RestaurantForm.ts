import { CATEGORY, SELECT_DISTANCE } from '../constants';
import { IRestaurant } from '../domain/Restaurant';
import { closeModal } from '../modal';
import Select from './Select';
import { CategoryOptions, DistanceTime } from '../types/type';
import { arrayElementToObject } from '../utils/util';
import { store } from '../store';

export default class RestaurantForm {
  $formContainer = document.createElement('div');

  constructor(renderListArticle: ($ele: HTMLElement) => void) {
    this.$formContainer.addEventListener('click', (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      const { type } = e.target.dataset;

      if (type === 'submit') this.handleFormSubmit(e, renderListArticle);
      if (type === 'cancel') this.handleFormCancel();
    });
  }

  handleFormCancel = () => {
    closeModal();
  };

  handleFormSubmit = (
    event: Event,
    renderListArticle: ($ele: HTMLElement) => void
  ) => {
    event.preventDefault();
    const { target, currentTarget } = event;

    if (!target) return null;
    if (!(currentTarget instanceof HTMLElement)) return;
    const $form = currentTarget.querySelector('form') as HTMLFormElement;

    const restaurantInfo = this.getFormDatas($form);

    store.addRestaurantInfo(restaurantInfo);
    renderListArticle(store.$listArticle as HTMLElement);

    $form.reset();

    closeModal();
  };

  getFormDatas = ($form: HTMLFormElement): IRestaurant => {
    const category = $form.querySelector<HTMLSelectElement>('#category');
    const name = $form.querySelector<HTMLInputElement>('#name');
    const distance = $form.querySelector<HTMLSelectElement>('#distance');
    const description =
      $form.querySelector<HTMLTextAreaElement>('#description');
    const link = $form.querySelector<HTMLInputElement>('#link');

    return {
      id: Date.now(),
      category: category ? (category.value as CategoryOptions) : '한식',
      name: name ? name.value : '',
      distance: distance ? (Number(distance.value) as DistanceTime) : 5,
      description: description ? description.value : '',
      link: link ? link.value : '',
      isFavorite: false,
    };
  };

  template() {
    return `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form>  
        ${RestaurantFormTemplate()}
      </form>
    `;
  }

  render($targetElement: HTMLElement) {
    this.$formContainer.innerHTML = this.template();
    $targetElement.insertAdjacentElement('beforeend', this.$formContainer);
  }
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
      <button data-type="cancel" type="button" class="button button--secondary text-caption" >취소하기</button>
      <button data-type="submit" type='submit'class="button button--primary text-caption" >추가하기</button>
    </div>
  `;
}
