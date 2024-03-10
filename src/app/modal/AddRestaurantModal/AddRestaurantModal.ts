import { $ } from '../../../util/domSelector';
import { Category, DistanceByWalk } from '../../../enum/enums';
import { RestaurantData } from '../../../type/types';
import handleError from '../../../util/handleError';
import RestaurantValidator from '../../../validator/RestaurantValidator';

class AddRestaurantModal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    $('#cancel-adding-restaurant-button').addEventListener('click', () => {
      this.clearModal();
    });

    $('#add-restaurant-form').addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.handleFormData(new FormData(event.target as HTMLFormElement));
    });
  }

  private handleFormData(formData: FormData) {
    const formDataEntries = Object.fromEntries(formData.entries());
    if (this.isRestaurantData(formDataEntries)) {
      this.submitNewRestaurant(formDataEntries);
      return;
    }
    alert('입력된 음식점 정보가 올바르지 않습니다. 새로고침 후 다시 입력해주세요.');
  }

  private submitNewRestaurant(formDataEntries: RestaurantData) {
    try {
      RestaurantValidator.validateUserInput(formDataEntries);
      this.dispatchEvent(new CustomEvent('submitAddingRestaurant', { detail: formDataEntries }));
      this.clearModal();
    } catch (error) {
      handleError(error);
    }
  }

  private isRestaurantData(object: any): object is RestaurantData {
    return (
      'name' in object &&
      'category' in object &&
      Object.values(Category).includes(object.category) &&
      'distanceByWalk' in object &&
      Object.values(DistanceByWalk).includes(object.distanceByWalk)
    );
  }

  private clearModal() {
    this.clearAllInput();
    $<HTMLDialogElement>('#add-restaurant-modal').close();
  }

  private clearAllInput() {
    $<HTMLFormElement>('#add-restaurant-form').reset();
  }

  private getDefaultSelection() {
    return `
      <option value="">선택해 주세요</option>
    `;
  }
  private getEachCategory() {
    return Object.values(Category)
      .map((category) => {
        return `<option value="${category}">${category}</option>`;
      })
      .join('');
  }

  private showCategorySelectbox() {
    return `
      <!-- 카테고리 -->
      <div class="form-item form-item--required">
        <label for="category text-caption">카테고리</label>
        <select name="category" id="restaurant-category" required>
          ${this.getDefaultSelection()}
          ${this.getEachCategory()}
        </select>
      </div>
      `;
  }

  private getEachDistanceByWalk() {
    return Object.entries(DistanceByWalk)
      .map(([minutesText, minutes]) => {
        return `<option value="${minutes}">${minutesText}</option>`;
      })
      .join('');
  }

  private showDistanceByWalkSelectbox() {
    return `
      <!-- 거리 -->
      <div class="form-item form-item--required">
        <label for="distance text-caption">거리(도보 이동 시간) </label>
        <select name="distanceByWalk" id="restaurant-distancebywalk" required>
        ${this.getDefaultSelection()}
        ${this.getEachDistanceByWalk()};
        </select>
      </div>
    `;
  }

  private render() {
    this.innerHTML = `
      <!-- 음식점 추가 모달 -->
      <dialog id="add-restaurant-modal">
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form id="add-restaurant-form">

            <!-- 음식점 이름 -->
            <div class="form-item form-item--required">
              <label for="name text-caption">이름</label>
              <input type="text" name="name" id="restaurant-name" required />
            </div>

            ${this.showCategorySelectbox()}

            ${this.showDistanceByWalkSelectbox()}

            <!-- 설명 -->
            <div class="form-item">
              <label for="description text-caption">설명</label>
              <textarea name="description" id="restaurant-description" cols="30" rows="5"></textarea>
              <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
            </div>

            <!-- 링크 -->
            <div class="form-item">
              <label for="link text-caption">참고 링크</label>
              <input type="text" name="referenceUrl" id="restaurant-referenceurl" />
              <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
            </div>

            <!-- 취소/추가 버튼 -->
            <div class="button-container">
              <button type="button" class="button button--secondary text-caption" id="cancel-adding-restaurant-button">취소하기</button>
              <button type="submit" class="button button--primary text-caption" id="submit-adding-restaurant-button">추가하기</button>
            </div>
          </form>
        </div>
      </dialog>
    `;
  }
}

customElements.define('add-restaurant-modal', AddRestaurantModal);
