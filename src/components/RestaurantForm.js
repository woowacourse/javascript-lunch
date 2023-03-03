import selectTemplate from '../template/selectTemplate';
import { RestaurantFilterTemplate } from './Filters';

export default function RestaurantForm($root, submitHandler, cancelHandler) {
  const $form = document.createElement('form');

  this.render = () => {
    $form.innerHTML = `
      ${RestaurantFormTemplate()}
    `;
  };

  this.init = () => {
    $root.innerHTML = '<h2 class="modal-title text-title">새로운 음식점</h2>';
    this.render();

    $form.addEventListener('submit', submitHandler);

    const $cancelButton = $form.querySelector('#cancel-button');
    $cancelButton.addEventListener('click', cancelHandler);

    $root.appendChild($form);
  };

  this.init();
}

function RestaurantFormTemplate() {
  return `
    <div class="form-item form-item--required">
      <label for="category text-caption">카테고리</label>
      ${selectTemplate({
        name: 'category',
        id: 'category',
        options: [
          { value: '', text: '선택해 주세요' },
          { value: '한식', text: '한식' },
          { value: '중식', text: '중식' },
          { value: '일식', text: '일식' },
          { value: '양식', text: '양식' },
          { value: '아시안', text: '아시안' },
          { value: '기타', text: '기타' },
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
      ${selectTemplate({
        name: 'distance',
        id: 'distance',
        options: [
          { value: '', text: '선택해 주세요' },
          { value: '5', text: '5분 내' },
          { value: '10', text: '10분 내' },
          { value: '15', text: '15분 내' },
          { value: '20', text: '20분 내' },
          { value: '30', text: '30분 내' },
        ],
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
      <button id="cancel-button" type="button" class="button button--secondary text-caption">취소하기</button>
      <button class="button button--primary text-caption">추가하기</button>
    </div>
  `;
}
