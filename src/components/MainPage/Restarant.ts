import categoryKorean from "../../../templates/category-korean.png";
import categoryAsian from "../../../templates/category-asian.png";
import categoryChinese from "../../../templates/category-chinese.png";
import categoryEtc from "../../../templates/category-etc.png";
import categoryJapanese from "../../../templates/category-japanese.png";
import categoryWestern from "../../../templates/category-western.png";
import { RestaurantType } from "../../Template";

const categoryCountry = {
  한식: categoryKorean,
  중식: categoryChinese,
  일식: categoryJapanese,
  양식: categoryWestern,
  아시안: categoryAsian,
  기타: categoryEtc,
};

export const Restaurant = {
  template({ category, name, takeTime, description }: RestaurantType) {
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
            ${descriptionTemplate ? descriptionTemplate : ""}
            </div>
        </li>`;
  },
};
