import { IcategoryInfo } from "../../types/category";
import { Irestaurant } from "../../types/restaurant";

import likeTemplate from "./like/likeTemplate";

export const baseTemplate = (
  id: number,
  categoryTemplate: string,
  InfoTemplate: string,
) => /*html*/ `
<li id="${id}" class="restaurant">${categoryTemplate}${InfoTemplate}</li>
`;

export const categoryTemplate = (categoryInfo: IcategoryInfo) => /*html*/ ` 
  <div class="restaurant__category">
    <img
      src="${categoryInfo.categoryImg}"
      alt="${categoryInfo.category}"
      class="category-icon"
    />
  </div>`;

export const restaurantInfoTemplate = (restaurant: Irestaurant) => /*html*/ `
<h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
<span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
`;

export const mainInfoTemplate = (restaurant: Irestaurant) => /*html*/ `
<div class="restaurant__main-info">
  <div>
  ${restaurantInfoTemplate(restaurant)}
  </div>
  ${likeTemplate(restaurant.isLike)}
</div>
`;

export const InfoTemplate = (restaurant: Irestaurant) => /*html*/ `
<div class="restaurant__info">
 ${mainInfoTemplate(restaurant)}
  <p class="restaurant__description text-body">${restaurant.description || ""}</p>
</div>`;
