import { createElement } from "../utils/utils.js";
import { StarButton } from "./common/StarButton.js";

export function StoreInfo({
  name,
  distance,
  description,
  link,
  type,
  isFavorite,
}) {
  function template() {
    return `
            ${
              type === "summary"
                ? `<div class="restaurant__info">`
                : `<div class="restaurant__info__full">`
            }
            <div class="restaurant__title-box">
              <div class="restaurant__title">
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
              </div>
              ${StarButton(isFavorite)}
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
