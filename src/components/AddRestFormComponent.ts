import RestDataAPI from '../services/RestDataAPI';
import { KeyOfCategory, KeyOfDistance, Restaurant } from '../types/types';
import { $ } from '../utils/dom';
import Component from './Component';

class AddRestFormComponent extends Component {
  protected render({ component }: { component: string }): string {
    return `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form>
        <!-- 카테고리 -->
        <div class="form-item form-item--required">
          <label for="category text-caption">카테고리</label>
          <select name="category" id="category" required>
            <option value="">선택해 주세요</option>
            <option value="korean">한식</option>
            <option value="chinese">중식</option>
            <option value="japanese">일식</option>
            <option value="western">양식</option>
            <option value="asian">아시안</option>
            <option value="etc">기타</option>
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
          <button type="button" class="button button--secondary text-caption">취소하기</button>
          <button type="submit" class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    `;
  }

  protected setEvents() {
    this.addEvent({ target: $('form', this), type: 'submit', handler: this.handleSubmit });
    this.addEvent({ target: $('.button--secondary', this), type: 'click', handler: this.handleCancel });
  }

  private handleSubmit: EventListener = (e): void => {
    e.preventDefault();
    RestDataAPI.save(this.getFormData());
    this.emitCustomEvent('closeModal');
    this.emitCustomEvent('reloadList');
  };

  private handleCancel: EventListener = (): void => {
    this.emitCustomEvent('closeModal');
  };

  private getFormData(): Restaurant {
    const category = ($('#category') as HTMLSelectElement).value as Exclude<KeyOfCategory, 'all'>;
    const name = ($('#name') as HTMLInputElement).value;
    const distance = ($('#distance') as HTMLSelectElement).value as KeyOfDistance;
    const description = ($('#description') as HTMLTextAreaElement).value;
    const link = ($('#link') as HTMLInputElement).value;

    return { category, name, distance, description, link };
  }
}

customElements.define('add-rest-form', AddRestFormComponent);
