import Component from '../Component';

export default class AddModal extends Component {
  constructor($target) {
    super($target);

    this.addEvent('click', (event) => {
      this.cancelInputData(event);
    }).addEvent('submit', (event) => {
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
              <button class="button button--primary text-caption">추가하기</button>
            </div>
          </form>
        </div>
      `;
  }

  cancelInputData(event) {
    if (event.target.id === 'cancel-modal-button') {
      event.currentTarget.classList.remove('modal--open');
    }
  }

  submitInputData(event) {
    event.preventDefault();

    const inputData = [...event.target].map((el) => {
      return el.value;
    });

    if (inputData[2] === '' || !inputData[2].match(/^[a-zA-Z0-9]*$/).length) {
      alert('음식점 이름은 적어도 하나의 문자를 입력해야 합니다.');
      return;
    }

    const addData = {
      category: inputData[0],
      storeName: inputData[1],
      distance: inputData[2],
      detail: inputData[3],
      link: inputData[4],
    };

    this.restaurantManager.addRestaurant(addData);
    event.currentTarget.classList.remove('modal--open');
  }
}
