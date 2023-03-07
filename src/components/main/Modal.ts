import { Restaurant } from '../../type';
import Component from '../Component';
import { CATEGORIES, DEFAULT_CATEGORY, DEFAULT_DISTANCE } from '../../utils/constants';
import store from '../../lib/restaurantsStorage';

interface ModalProps {
  toggleModal: () => void;
}

interface ModalState {
  restaurantForm: Restaurant;
}

class Modal extends Component<ModalProps, ModalState> {
  constructor($parent: HTMLElement, props: ModalProps) {
    const initialState = {
      restaurantForm: {
        name: '',
        category: DEFAULT_CATEGORY,
        distance: DEFAULT_DISTANCE,
        description: '',
        link: '',
      },
    };
    super({
      $parent,
      props,
      tagName: 'div',
      initialState,
    });
  }

  drawInnerHTML() {
    return `
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form id="modal-form">
            <!-- 카테고리 -->
            <div class="form-item form-item--required">
              <label for="category text-caption">카테고리</label>
              <select name="category" id="category" required>
                <option value="">선택해 주세요</option>
                ${CATEGORIES.slice(1)
                  .map((category) => `<option value="${category}">${category}</option>`)
                  .join('')}
              </select>
            </div>

            <!-- 음식점 이름 -->
            <div class="form-item form-item--required">
              <label for="name text-caption">이름</label>
              <input type="text" name="name" id="name" required>
            </div>

            <!-- 거리 -->
            <div class="form-item form-item--required">
              <label for="distance text-caption">거리(도보 이동 시간) </label>
              <select name="distance" id="distance" required>
                <option value="">선택해 주세요</option>
                <option value="5">5분 내</option>
                <option value="10">10분 내</option>
                <option value="15">15분 내</option>
                <option value="20">20분 내</option>
                <option value="30">30분 내</option>
              </select>
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
              <button type="button" id="modal-cancel" class="button button--secondary text-caption">취소하기</button>
              <button class="button button--primary text-caption">추가하기</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  addEvent() {
    this.$('#modal-cancel')?.addEventListener('click', this.props.toggleModal);
    this.$('#modal-form')?.addEventListener('submit', this.submitForm.bind(this));
  }

  submitForm(e: Event) {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
      const { $category, $name, $distance, $description, $link } = e.target;
      const restaurant: Restaurant = {
        category: $category.options[$category.selectedIndex].value,
        name: $name.value,
        distance: $distance.options[$distance.selectedIndex].value,
        description: $description.value ?? '',
        link: $link.value ?? '',
      };

      store.setRestaurants([...store.getRestaurants(), restaurant]);
    }

    this.props.toggleModal();
  }
}

export default Modal;
