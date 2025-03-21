import { StarButton } from "../common/StarButton.js";
import type { ILunchItem } from "../../type.ts";
import { CategoryIcon } from "../common/CategoryIcon.js";
import { ClickActions } from "../../constants/Events.js";

interface StoreInfoProps extends ILunchItem {
  type: string;
}

export function StoreInfo({
  category,
  name,
  distance,
  description,
  link,
  isFavorite,
  type,
}: StoreInfoProps) {
  function template() {
    return `
        ${CategoryIcon(category)}
            ${
              type === "summary"
                ? `<div class="restaurant__info">`
                : `<div class="restaurant__info full">`
            }
            <div class="restaurant__title-box">
              <div class="restaurant__title">
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
              </div>
              <div data-action=${
                ClickActions.TOGGLE_FAVORITE
              } class="star-button-container">
          ${StarButton(isFavorite)}
        </div>
            </div>
               
                <p class="restaurant__description text-body">${
                  description || "-"
                }</p>
                ${
                  link && type === "full"
                    ? `<a href="${link}" target="_blank" class="restaurant__link">${link}</a>`
                    : ""
                }
            </div>
    `;
  }
  return template();
}
