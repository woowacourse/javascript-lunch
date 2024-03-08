import { $, $$ } from '../../../utils/domSelector';
import { TYPE_SETTING } from '../../../constants/setting';
import { ILocation } from '../../../interface/Interface';
import RestaurantService from '../../../service/RestaurantService';
import { Category, LocationData, MinutesWalk } from '../../../constants/Type';

class AddRestaurantModal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    $('#cancel-adding-restaurant-button', this)?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('cancelAddingRestaurant'));
      this.clearAllInput();
      $<HTMLDialogElement>('#add-restaurant-modal')!.close();
    });

    $('#submit-adding-restaurant-button', this)?.addEventListener('click', () => {
      const restaruantData = this.inputToRestaurantData();
      this.dispatchEvent(new CustomEvent('submitAddingRestaurant', { detail: restaruantData }));
      this.clearAllInput();
      $<HTMLDialogElement>('#add-restaurant-modal')!.close();
    });
  }

  private inputToRestaurantData() {
    const restaurantData: LocationData = {
      name: $<HTMLInputElement>('#restaurant-name')!.value,
      category: $<HTMLSelectElement>('#restaurant-category')!.value as Category,
      minutesWalk: parseInt($<HTMLSelectElement>('#restaurant-minuteswalk')!.value) as MinutesWalk,
      description: $<HTMLTextAreaElement>('#restaurant-description')!.value,
      referenceUrl: $<HTMLInputElement>('#restaurant-referenceurl')!.value,
    };
    return restaurantData;
  }

  private clearAllInput() {
    $$('input, textarea, select', this).forEach((input) => {
      if (
        input instanceof HTMLInputElement ||
        input instanceof HTMLSelectElement ||
        input instanceof HTMLTextAreaElement
      ) {
        input.value = '';
      }
    });
  }

  private getDefaultSelection() {
    return `
    <option value="">선택해 주세요</option>
    `;
  }
  private getEachCategory() {
    return TYPE_SETTING.category
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
    </div>`;
  }

  private getEachMinutesWalk() {
    return TYPE_SETTING.minutesWalk
      .map((minutesWalk) => {
        return `<option value="${minutesWalk}">${minutesWalk}분 내</option>`;
      })
      .join('');
  }

  private showMinutesWalkSelectbox() {
    return `
    <!-- 거리 -->
        <div class="form-item form-item--required">
          <label for="distance text-caption">거리(도보 이동 시간) </label>
          <select name="distance" id="restaurant-minuteswalk" required>
          ${this.getDefaultSelection()}
          ${this.getEachMinutesWalk()};
          </select>
        </div>
    `;
  }

  // private createSelectBox({ selectBoxName: string, label: string, options: string }): string {
  //   return `
  //     <div class="form-item form-item--required">
  //       <label for="${selectBoxName} text-caption">거리(도보 이동 시간) </label>
  //       <select name="distance" id="distance" required>
  //         ${this.getDefaultSelection()}
  //         ${this.getEachMinutesWalk()};
  //       </select>
  //     </div>
  //   `;
  // }

  //TODO: 위 코드 살려보기!

  private render() {
    this.innerHTML = `
    <!-- 음식점 추가 모달 -->
    <dialog id="add-restaurant-modal">
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form>

          <!-- 음식점 이름 -->
          <div class="form-item form-item--required">
            <label for="name text-caption">이름</label>
            <input type="text" name="restaurant-name" id="restaurant-name" required />
          </div>

          ${this.showCategorySelectbox()}

          ${this.showMinutesWalkSelectbox()}

          <!-- 설명 -->
          <div class="form-item">
            <label for="description text-caption">설명</label>
            <textarea name="description" id="restaurant-description" cols="30" rows="5"></textarea>
            <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
          </div>

          <!-- 링크 -->
          <div class="form-item">
            <label for="link text-caption">참고 링크</label>
            <input type="text" name="link" id="restaurant-referenceurl" />
            <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>

          <!-- 취소/추가 버튼 -->
          <div class="button-container">
            <button type="button" class="button button--secondary text-caption" id="cancel-adding-restaurant-button">취소하기</button>
            <button type="button" class="button button--primary text-caption" id="submit-adding-restaurant-button">추가하기</button>
          </div>
        </form>
      </div>
    </dialog>
    `;
  }
}

customElements.define('add-restaurant-modal', AddRestaurantModal);
