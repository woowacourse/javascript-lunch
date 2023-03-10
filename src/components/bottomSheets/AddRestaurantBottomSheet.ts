import Component from '../../core/Component';

import IRestaurantInput from '../../interfaces/IRestaurantInput';
import { IComponentPropState } from '../../interfaces/IComponent';
import defaultDummyRestaurantsData from '../../constants/defaultDummyRestaurantsData';
import { setLocalStorageItem } from '../../utils/localStroageUtils';

class AddRestaurantBottomSheet extends Component<IComponentPropState> {
  template() {
    return `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form class="restaurant-form" >
  <!-- 카테고리 -->
  <div class="form-item form-item--required">
    <label for="category text-caption">카테고리</label>
    <select name="category" id="category" required>
<option value="" disabled selected>선택해 주세요</option>
<option value="한식">한식</option>
    <option value="중식">중식</option>
    <option value="일식">일식</option>
    <option value="양식">양식</option>
    <option value="아시안">아시안</option>
    <option value="기타">기타</option>
    </select>
    <p id='category-error' class='input-error-message'><p/>
    </div>

    <!-- 음식점 이름 -->
    <div class="form-item form-item--required">
  <input type="text" name="name" id="name" required />
<label for="name text-caption">이름</label>
    <p id='name-error' class='input-error-message'><p/>
    </div>

    <!-- 거리 -->
    <div class="form-item form-item--required">
    <label for="distance text-caption">거리(도보 이동 시간) </label>
<select name="distance" id="distance" required>
<option value="" disabled selected>선택해 주세요</option>
<option value="5">5분 내</option>
<option value="10">10분 내</option>
<option value="15">15분 내</option>
<option value="20">20분 내</option>
<option value="30">30분 내</option>
</select>
<p id='distance-error' class='input-error-message'><p/>
    </div>

    <!-- 설명 -->
    <div class="form-item">
    <label for="description text-caption">설명</label>
    <textarea
  name="description"
  id="description"
  cols="30"
  rows="5"
    ></textarea>
    <span class="help-text text-caption"
    >메뉴 등 추가 정보를 입력해 주세요.</span
>
</div>

  <!-- 링크 -->
<div class="form-item">
    <label for="link text-caption">참고 링크</label>
<input type="text" name="link" id="link" />
  <span class="help-text text-caption"
    >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
>
</div>

  <!-- 취소/추가 버튼 -->
<div class="button-container">
  <button
    type="button"
  class="button button--secondary text-caption cancel"
  onClick="this"
    >
    취소하기
    </button>
    <button class="button button--primary text-caption submit-restaurant">
    추가하기
    </button>
    </div>
    </form>
    `;
  }

  getInputs(): IRestaurantInput {
    const categoryInput =
      this.$target.querySelector<HTMLInputElement>('#category');
    const nameInput = this.$target.querySelector<HTMLInputElement>('#name');
    const distanceInput =
      this.$target.querySelector<HTMLInputElement>('#distance');
    const descriptionInput =
      this.$target.querySelector<HTMLInputElement>('#description');
    const linkInput = this.$target.querySelector<HTMLInputElement>('#link');

    return {
      category: categoryInput?.value ?? '',
      name: nameInput?.value ?? '',
      distance: distanceInput?.value || '',
      description: descriptionInput?.value ?? '',
      link: linkInput?.value ?? '',
      isFavorite: false,
    };
  }

  addRestaurant(restaurantInput: IRestaurantInput, updateRootState: Function) {
    const restaurantList: IRestaurantInput[] =
      this.$props.restaurantList === defaultDummyRestaurantsData
        ? []
        : this.$props.restaurantList;

    restaurantList.push(restaurantInput);

    setLocalStorageItem('restaurantList', restaurantList);
    updateRootState({ restaurantList });
  }

  showErrorMessage(idName: string): void {
    const target = this.$target.querySelector(`#${idName}-error`);
    if (target instanceof HTMLParagraphElement) {
      target.innerText = '값을 입력해주세요';
    }
  }

  resetErrorMessage(): void {
    const errorMessages = this.$target.querySelectorAll('.input-error-message');

    errorMessages.forEach((errorMessage) => {
      errorMessage.textContent = '';
    });
  }

  setEvent(): void {
    const { toggleModal, updateRootState } = this.$props;

    this.addEvent('click', '.cancel', () => {
      toggleModal();
    });

    this.addEvent('click', '.submit-restaurant', (event: Event) => {
      event.preventDefault();

      const restaurantInput: IRestaurantInput = this.getInputs();
      this.resetErrorMessage();

      const { category, name, distance } = restaurantInput;
      if (!category || !name || !distance) {
        if (!category) {
          this.showErrorMessage('category');
        }
        if (!name) {
          this.showErrorMessage('name');
        }
        if (!distance) {
          this.showErrorMessage('distance');
        }
        return;
      }

      this.addRestaurant(restaurantInput, updateRootState);
      toggleModal();
    });
  }
}

export default AddRestaurantBottomSheet;
