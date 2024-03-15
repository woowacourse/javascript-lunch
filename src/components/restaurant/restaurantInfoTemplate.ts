import likeImg from "../../../templates/favorite-icon-filled.png";
import unlikeImg from "../../../templates/favorite-icon-lined.png";
import { IcategoryInfo } from "../../types/category";
import { Idistance } from "../../types/distance";

export const categoryTemplate = (categoryInfo: IcategoryInfo) => /*html*/ ` 
<div class="restaurant__category">
  <img
    src="${categoryInfo.categoryImg}"
    alt="${categoryInfo.category}"
    class="category-icon"
  />
</div>`;

export const likeImgTemplate = `
<img class="liked" src="${likeImg}" alt="자주 가는 음식점" />
`;

export const unlikeImgTemplate = `
<img class="unliked" src="${unlikeImg}" alt="자주 가지 않는 음식점" />`;

export const likeTemplate = (isLike: boolean) => /*html*/ `
<button type="button" class="restaurant__like-button" aria-label="즐겨찾기">
    ${isLike ? likeImgTemplate : unlikeImgTemplate}
</button>
`;

export const modalLikeTemplate = (isLike: boolean) => /*html*/ `
<button type="button" class="modal__like-button" aria-label="즐겨찾기">
    ${isLike ? likeImgTemplate : unlikeImgTemplate}
</button>
`;

export const restaurantNameTemplate = (name: string) => /*html*/ `
<h3 class="restaurant__name text-subtitle">${name}</h3>
`;

export const distanceTemplate = (distance: Idistance) => /*html*/ `
<span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
`;

export const descriptionSummaryTemplate = (description?: string) => /*html*/ `
<p class="restaurant__description-summary text-body">${description || ""}</p>
`;

export const descriptionTemplate = (description?: string) => /*html*/ `
<p class="restaurant__description text-body">${description || ""}</p>
`;

export const linkTemplate = (link?: string) => /*html*/ `
<a href="${link}" class="restaurant__link text-body">${link || ""}</a>
`;
