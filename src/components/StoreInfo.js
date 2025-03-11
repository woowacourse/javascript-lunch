import { createElement } from "../utils/utils.js";

export function StoreInfo({ name, distance, description, link, type }) {
  function render() {
    return `
            ${type === "summary" ? `<div class="restaurant__info">` : `<div class="restaurant__info__full">`}
                <h3 class="restaurant__name text-subtitle">${name}</h3>
                <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
                <p class="restaurant__description text-body">${description || "-"}</p>
                ${link ? `<a href="${link}" target="_blank" class="restaurant__link">${link}</a>` : ""}
            </div>
    `;
  }
  return render();
}
