import { StarButton } from "./common/StarButton.js";
import type { ILunchItem } from "../type.ts";
import { CategoryIcon } from "./common/CategoryIcon.js";

interface StoreInfoProps extends ILunchItem {
  type: string;
  index: string;
}

export function StoreInfo({
  category,
  name,
  distance,
  description,
  link,
  isFavorite,
  type,
  index,
}: StoreInfoProps) {
  function template() {
    return `
        ${CategoryIcon(category)}
            ${
              type === "summary"
                ? `<div class="restaurant__info">`
                : `<div class="restaurant__info full" data-index="${index}">`
            }
            <div class="restaurant__title-box">
              <div class="restaurant__title">
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
              </div>
              <div data-action="toggleFavorite" class="star-button-container">
          ${StarButton(isFavorite)}
        </div>
            </div>
               
                <p class="restaurant__description text-body">${
                  description || "-"
                }</p>
                ${
                  link
                    ? `<a href="${link}" target="_blank" class="restaurant__link">${link}</a>`
                    : ""
                }
            </div>
    `;
  }
  return template();
}
