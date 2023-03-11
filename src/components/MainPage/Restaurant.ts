import categoryKorean from "../../../templates/category-korean.png";
import categoryAsian from "../../../templates/category-asian.png";
import categoryChinese from "../../../templates/category-chinese.png";
import categoryEtc from "../../../templates/category-etc.png";
import categoryJapanese from "../../../templates/category-japanese.png";
import categoryWestern from "../../../templates/category-western.png";
import star from "../../../templates/favorite-icon-filled.png";
import lineStar from "../../../templates/favorite-icon-lined.png";
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
  template({
    category,
    name,
    id,
    like,
    takeTime,
    description,
  }: RestaurantType) {
    const descriptionTemplate =
      description &&
      `<p class="restaurant__description text-body">${description}</p>`;

    return `
        <li class="restaurant" id=${id}>
          <div class="restaurant__category">
            <img src="${
              categoryCountry[category] ?? categoryCountry["기타"]
            }" alt="${category ?? "기타"}" class="category-icon">
          </div>
          <div class="restaurant__info">
            <div class="restaurant__main">
              <div>
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${takeTime}분 내</span>
              </div>
              <img class="likeImg" src="${
                like ? star : lineStar
              }" alt="선호되는 가게 여부"/>
            </div>
            ${descriptionTemplate ?? ""}
          </div>
        </li>`;
  },
};
