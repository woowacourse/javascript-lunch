import addButtonImg from "../../templates/add-button.png";
import categoryKorean from "../../templates/category-korean.png";
import categoryAsian from "../../templates/category-asian.png";
import categoryChinese from "../../templates/category-chinese.png";
import categoryEtc from "../../templates/category-etc.png";
import categoryJapanese from "../../templates/category-japanese.png";
import categoryWestern from "../../templates/category-western.png";
import { RestaurantType } from "./components/Restaurant";

const categoryCountry = {
  한식: categoryKorean,
  중식: categoryChinese,
  일식: categoryJapanese,
  양식: categoryWestern,
  아시안: categoryAsian,
  기타: categoryEtc,
};

export const Template = {
  mainHeader() {
    return `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      ${this.modalButton()}
    </header>`;
  },

  modalButton() {
    return `
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src=${addButtonImg} alt="음식점 추가">
      </button>`;
  },

  restaurantList(restaurantList: RestaurantType[]): string {
    return `<ul class='restaurant-list'>
    ${restaurantList.map((restaurant) => this.restaurant(restaurant)).join("")}
    </ul>`;
  },

  restaurant({ category, name, takeTime, description }: RestaurantType) {
    const descriptionTemplate =
      description &&
      `<p class="restaurant__description text-body">${description}</p>`;

    return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="${
          categoryCountry[category]
        }" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${takeTime}분 내</span>
      </div>
    </li>${descriptionTemplate ? descriptionTemplate : ""}`;
  },

  filterButton: `
    <select name="category" id="category-filter" class="restaurant-filter">
      <option value="전체">전체</option>
      <option value="한식">한식</option>
      <option value="중식">중식</option>
      <option value="일식">일식</option>
      <option value="양식">양식</option>
      <option value="아시안">아시안</option>
      <option value="기타">기타</option>
    </select>`,

  sortByButton: `
    <select name="sorting" id="sorting-filter" class="restaurant-filter">
      <option value="name">이름순</option>
      <option value="distance">거리순</option>
    </select>`,

  modalHeader: `<h2 class="modal-title text-title">새로운 음식점</h2>`,

  categoryInput: `
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
    </div>`,

  nameInput: `
    <div class="form-item form-item--required">
      <label for="name text-caption">이름</label>
      <input type="text" name="name" id="name" required>
    </div>
    `,

  takeTimeInput: `
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
    </div>`,

  descriptionInput: `
    <div class="form-item">
      <label for="description text-caption">설명</label>
      <textarea name="description" id="description" cols="30" rows="5"></textarea>
      <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
    </div>`,

  linkInput: `
    <div class="form-item">
      <label for="link text-caption">참고 링크</label>
      <input type="text" name="link" id="link">
      <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
    </div>`,

  addButton: `
    <div class="button-container">
      <button type="button" class="button button--secondary text-caption">취소하기</button>
      <button class="button button--primary text-caption">추가하기</button>
    </div>`,
};
