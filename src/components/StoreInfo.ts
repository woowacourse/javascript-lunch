import { StarButton } from "./common/StarButton.js";
import type { ILunchItem } from "../type.ts";

interface StoreInfoProps extends ILunchItem {
  type: string;
}

export function StoreInfo(
  { name, distance, description, link, isFavorite }: StoreInfoProps,
  type = "summary"
) {
  function template() {
    return `
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
