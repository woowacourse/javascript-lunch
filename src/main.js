import Header from './components/Header.js';
import Modal from './components/Modal.js';
import PlusButton from './components/PlusButton.js';
import RestaurantAddModal from './components/RestaurantAddModal.js';
import RestaurantIcon from './components/RestaurantIcon.js';
import RestaurantItem from './components/RestaurantItem.js';
import RestaurantList from './components/RestaurantList.js';
import createDOMElement from './util/createDomElement.js';
import { lockScroll, unlockScroll } from './util/scroll.js';
import { $ } from './util/selector.js';

addEventListener('load', () => {
  const body = $('body');

  const header = Header({ title: '점심 뭐 먹지', right: PlusButton() });
  body.prepend(header);

  const main = $('main');

  main.appendChild(RestaurantList());

  const restaurantAddModal = RestaurantAddModal();

  // modal.innerHTML =
  //   /* html */
  //   `<div class="modal-backdrop"></div>
  // <div class="modal-container">
  // <h2 class="modal-title text-title">새로운 음식점</h2>
  // <form>
  // <!-- 카테고리 -->
  // <div class="form-item form-item--required">
  // <label for="category text-caption">카테고리</label>
  // <select name="category" id="category" required>
  // <option value="">선택해 주세요</option>
  // <option value="한식">한식</option>
  // <option value="중식">중식</option>
  // <option value="일식">일식</option>
  // <option value="양식">양식</option>
  // <option value="아시안">아시안</option>
  // <option value="기타">기타</option>
  // </select>
  // </div>

  // <!-- 음식점 이름 -->
  // <div class="form-item form-item--required">
  // <label for="name text-caption">이름</label>
  // <input type="text" name="name" id="name" required />
  // </div>

  // <!-- 거리 -->
  // <div class="form-item form-item--required">
  // <label for="distance text-caption">거리(도보 이동 시간) </label>
  // <select name="distance" id="distance" required>
  // <option value="">선택해 주세요</option>
  // <option value="5">5분 내</option>
  // <option value="10">10분 내</option>
  // <option value="15">15분 내</option>
  // <option value="20">20분 내</option>
  // <option value="30">30분 내</option>
  // </select>
  // </div>

  // <!-- 설명 -->
  // <div class="form-item">
  // <label for="description text-caption">설명</label>
  // <textarea name="description" id="description" cols="30" rows="5"></textarea>
  // <span class="help-text text-caption">.메뉴 등 추가 정보를 입력해 주세요</span>
  // </div>

  // <!-- 링크 -->
  // <div class="form-item">
  // <label for="link text-caption">참고 링크</label>
  // <input type="text" name="link" id="link" />
  // <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
  // </div>

  // <!-- 취소/추가 버튼 -->
  // <div class="button-container">
  // <button type="button" class="button button--secondary text-caption">취소하기</button>
  // <button class="button button--primary text-caption">추가하기</button>
  // </div>
  // </form>
  // </div>
  // `;

  main.appendChild(restaurantAddModal);
  const plusButton = $('.gnb__button');
  plusButton.addEventListener('click', () => {
    restaurantAddModal.classList.add('modal--open');
    lockScroll();
  });

  // const cancelButton = $('.button--secondary');
  // cancelButton.addEventListener('click', () => {
  //   restaurantAddModal.classList.remove('modal--open');
  //   unlockScroll();
  // });
  // const modalBackdrop = $('.modal-backdrop');
  // modalBackdrop.addEventListener('click', () => {
  //   restaurantAddModal.classList.remove('modal--open');
  //   unlockScroll();
  // });
});
