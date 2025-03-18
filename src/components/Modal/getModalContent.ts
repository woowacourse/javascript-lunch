import { Restaurant } from "../../../types/global.js";
import { categoryValue } from "../../constants/optionValue.js";
import Dropdown from "../Dropdown/Dropdown.js";
import Input from "../Input/Input.js";

const distanceValue = {
  5: "5분 내",
  10: "10분 내",
  15: "15분 내",
  20: "20분 내",
  30: "30분 내",
};

const categoryDropdown = Dropdown({
  id: "category",
  required: "required",
  optionValue: categoryValue,
});
const nameInput = Input({ id: "name", required: "required", type: "text" });
const distanceDropdown = Dropdown({
  id: "distance",
  required: "required",
  optionValue: distanceValue,
});
const descriptionInput = Input({
  id: "description",
  required: "",
  type: "text",
});
const linkInput = Input({ id: "link", required: "", type: "url" });

export const addRestaurantContent = (): string => {
  return ` <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id='input-form'>
          ${categoryDropdown}
          ${nameInput}
          ${distanceDropdown}
          ${descriptionInput}
          ${linkInput}
          <div class="button-container">
            <button type="button" class="button button--secondary text-caption">취소하기</button>
            <button class="button button--primary text-caption">추가하기</button>
          </div>
        </form>`;
};

export const restaurantInfoContent = (data: Partial<Restaurant> = {}) => {
  return `
    <div id="restaurant_info_content" data-restaurant-id="${data.id}">
      <div class="modal-header">
        <div class="restaurant__category">
          <img src="${data.imgSrc}" alt="${data.imgAlt}" class="category-icon"/>     
        </div>
          <div class="iconButton_container data-restaurant-id="${data.id}"></div>
      </div>
        <div class="restaurant__info" id="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${data.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${data.distance}분 내</span>
          <p class="restaurant__description text-body" id="restaurant__description">${data.description}</p>
          <a href=${data.link} class="restaurant__description text-body">${data.link}</a>
        <div class="button-container">
          <button type="button" class="button button--secondary text-caption">삭제하기</button>
          <button class="button button--primary text-caption">닫기</button>
        </div>
    </div>
`;
};
