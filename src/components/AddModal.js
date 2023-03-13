import Component from '../Component';
import { geid, qs } from '../utils/domHelpers';
import { isAbnormalStoreName, isDuplicatedStoreName } from '../validation/validationInput';

export default class AddModal extends Component {
  constructor($target) {
    super($target);

    this.addEvent(
      'click',
      () => {
        this.cancelInputData();
      },
      geid('cancel-modal-button')
    ).addEvent('submit', (event) => {
      this.submitInputData(event);
    });
  }

  template() {
    return `
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
              <button type="button" id="cancel-modal-button" class="button button--secondary text-caption">취소하기</button>
              <button id="submit-modal-button" class="button button--primary text-caption">추가하기</button>
            </div>
          </form>
        </div>
      `;
  }

  cancelInputData() {
    qs('.modal').classList.remove('modal--open');
  }

  submitInputData(event) {
    event.preventDefault();

    const inputData = [...event.target].map((el) => {
      return el.value;
    });

    if (this.validateStoreName(inputData[1])) {
      return;
    }

    const addRestaurantData = {
      category: inputData[0],
      storeName: inputData[1],
      distance: inputData[2],
      detail: inputData[3],
      link: inputData[4],
      starShape: 'lined',
    };

    this.restaurantManager.addRestaurant(addRestaurantData);
    event.currentTarget.classList.remove('modal--open');
  }

  validateStoreName(storeName) {
    const storeNameList = this.restaurantManager
      .getRestaurantList()
      .map((restaurant) => restaurant.storeName);

    if (storeName.trim() === '' || !storeName.match(/^[a-zA-Z0-9가-힣ㄱ-ㅎ\s]*$/)) {
      alert('음식점 이름은 공백 또는 특수기호로만 이루어질 수 없습니다.');
      return true;
    }

    if (storeNameList.includes(storeName)) {
      alert('음식점 이름은 이미 추가된 음식점 이름과 중복될 수 없습니다.');
      return true;
    }

    return false;
  }
}
