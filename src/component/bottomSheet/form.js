import select from '../common/select';
import button from '../common/button';
import { CATEGORY_OPTIONS, TAKE_MINUTE_OPTIONS } from '../../constants';

const form = () => {
  const defaultOption = { value: '', content: '선택해 주세요' };
  return `
    <form>
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <div class="form-item form-item--required">
        <label for="category text-caption">카테고리</label>
        ${select({
          id: 'category',
          name: 'category',
          required: true,
          options: [defaultOption, ...CATEGORY_OPTIONS],
        })}
      </div>
      <div class="form-item form-item--required">
        <label for="name text-caption">이름</label>
        <input type="text" name="name" id="name" required>
      </div>
      <div class="form-item form-item--required">
        <label for="distance text-caption">거리(도보 이동 시간) </label>
        ${select({
          id: 'takeMinute',
          name: 'takeMinute',
          required: true,
          options: [defaultOption, ...TAKE_MINUTE_OPTIONS],
        })}
      </div>
      <div class="form-item">
        <label for="description text-caption">설명</label>
        <textarea name="description" id="description" cols="30" rows="5"></textarea>
        <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
      </div>
      <div class="form-item">
        <label for="link text-caption">참고 링크</label>
        <input type="text" name="link" id="link">
        <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
      </div>
      <div class="button-container">
        ${button({ id: 'cancel', type: 'button', style: 'secondary', content: '취소하기' })}
        ${button({ id: 'submit', type: 'submit', style: 'primary', content: '추가하기' })}
      </div>
    </form>
  `;
};

export default form;
