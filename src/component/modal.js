import select from './select';
import button from './button';

const modal = () => {
  const categoryOptions = [
    { value: '', content: '선택해 주세요' },
    { value: '한식', content: '한식' },
    { value: '중식', content: '중식' },
    { value: '일식', content: '일식' },
    { value: '양식', content: '양식' },
    { value: '아시안', content: '아시안' },
    { value: '기타', content: '기타' },
  ];
  const takeMinuteOptions = [
    { value: '', content: '선택해 주세요' },
    { value: '5', content: '5분 내' },
    { value: '10', content: '10분 내' },
    { value: '15', content: '15분 내' },
    { value: '20', content: '20분 내' },
    { value: '30', content: '30분 내' },
  ];

  return `
    <div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form>
          <div class="form-item form-item--required">
            <label for="category text-caption">카테고리</label>
            ${select({
              id: 'category',
              name: 'category',
              required: true,
              options: categoryOptions,
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
              options: takeMinuteOptions,
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
      </div>
    </div>
  `;
};

export default modal;
