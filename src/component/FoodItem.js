import { getImgSrcAlt } from "../util/getImgSrcAlt.js";

export function FoodItem({ category, name, distance, description }) {
  const { imgAlt, imgSrc } = getImgSrcAlt(category);

  const container = document.createElement("div");
  container.innerHTML = `
     <li class="restaurant">
          <div class="restaurant__category">
            <img src=${imgSrc} alt=${imgAlt} class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>`;

  return container.firstElementChild;
}
