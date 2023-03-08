import categoryKorean from "../templates/category-korean.png";
import categoryAsian from "../templates/category-asian.png";
import categoryChinese from "../templates/category-chinese.png";
import categoryEtc from "../templates/category-etc.png";
import categoryJapanese from "../templates/category-japanese.png";
import categoryWestern from "../templates/category-western.png";

export type CategoryType =
  | "한식"
  | "중식"
  | "일식"
  | "양식"
  | "아시안"
  | "기타";
export type TakeTimeType = 5 | 10 | 15 | 20 | 30;

export interface RestaurantType {
  category: CategoryType;
  name: string;
  takeTime: TakeTimeType;
  description?: string;
  link?: string;
}

const categoryCountry = {
  한식: categoryKorean,
  중식: categoryChinese,
  일식: categoryJapanese,
  양식: categoryWestern,
  아시안: categoryAsian,
  기타: categoryEtc,
};

export const Template = {
  mainHeader(BottomSheetButton: string) {
    return `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      ${BottomSheetButton}
    </header>`;
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
        ${descriptionTemplate ? descriptionTemplate : ""}
        </div>
    </li>`;
  },
};
