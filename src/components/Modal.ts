import { Component, Restaurant } from '../type';

type ModalState = {
  restaurantForm: Restaurant;
};

type ModalProps = {
  $parent: HTMLElement;
  toggleModal: () => void;
};

class Modal implements Component<ModalState> {
  $component: HTMLElement;
  state: ModalState;
  toggleModal: () => void;

  constructor({ $parent, toggleModal }: ModalProps) {
    this.$component = document.createElement('div');
    this.state = {
      restaurantForm: {
        name: '',
        category: '전체',
        distance: 5,
      },
    };
    this.toggleModal = toggleModal;
    $parent.append(this.$component);

    this.render();
  }

  setState(newState: ModalState) {
    this.state = newState;
    this.render();
  }

  render() {
    // TODO: 상태로 받은 li 띄우기
    this.$component.innerHTML = `
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
              <option value="한식">한식</option>
              <option value="중식">중식</option>
              <option value="일식">일식</option>
              <option value="양식">양식</option>
              <option value="아시안">아시안</option>
              <option value="기타">기타</option>
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

    const $cancelButton = document.getElementById('modal-cancel');
    $cancelButton?.addEventListener('click', this.toggleModal);

    const $modalForm = document.getElementById('modal-form');
    $modalForm?.addEventListener('submit', this.submitForm);
  }

  submitForm = (e: Event) => {
    e.preventDefault();
    const restaurants = JSON.parse(localStorage.getItem('restaurants') ?? '[]');
    restaurants.push(this.getFormValues());
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
    this.toggleModal();
  };

  getFormValues = () => {
    const $category = document.getElementById('category') as HTMLSelectElement;
    const $name = document.getElementById('name') as HTMLInputElement;
    const $distance = document.getElementById('distance') as HTMLSelectElement;
    const $description = document.getElementById('description') as HTMLTextAreaElement;
    const $link = document.getElementById('link') as HTMLInputElement;

    return {
      category: $category?.options[$category.selectedIndex].value,
      name: $name.value,
      distance: $distance.options[$distance.selectedIndex].value,
      description: $description.value ?? '',
      link: $link.value ?? '',
    };
  };
}

export default Modal;
