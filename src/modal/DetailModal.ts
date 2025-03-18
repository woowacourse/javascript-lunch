import { Restaurant } from "../shared/types";

export default function DetailModal(
  container: HTMLElement,
  inputValue: Restaurant
): void {
  container.innerHTML += `
      <div class="restaurant-detail-modal-background">
          <div class="restaurant-detail-modal">
              <div class="restaurant-detail-modal-images">
                  <div class="restaurant__category">
                      <img src="./category-${inputValue.category}.png" alt="${
    inputValue.categoryValue
  }" class="category-icon"/>
                  </div>
                  <button class="restaurant-favorite-star-button">
                    <img class="restaurant-favorite-star" src=${
                      inputValue.favorite === false
                        ? "./favorite-icon-lined.png"
                        : "./favorite-icon-filled.png"
                    } alt="favorite star"/>
                  </button>
              </div>
              <div class="restaurant-detail-modal-info">
                  <h3 class="restaurant__name text-subtitle">${
                    inputValue.nameValue
                  }</h3>
                  <span class="restaurant__distance text-body">
              캠퍼스부터 ${inputValue.distanceValue}분 내
              </span>
                  <p class="restaurant__detail__modal__distance text-body">${
                    inputValue.descriptionValue
                  }</p>
                  <a href="${inputValue.link}">${inputValue.link}</a>
              </div>
              <div class="restaurant-detail-modal-buttons">
                  <button class="restaurant-detail-modal-delete-button">삭제하기</button>
                  <button class="restaurant-detail-modal-close-button">닫기</button>
              </div>
          </div>
      </div>
      `;
}
