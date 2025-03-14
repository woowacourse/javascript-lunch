import { Button } from "../component/button/Button";
import { ButtonContainer } from "../component/button/ButtonContainer";
import { Modal } from "../component/layout/Modal";
import { deleteFoodItem } from "../domain/handler/FoodItemHandler";

export function FoodDetail(filter, foodItem, modal) {
  const { imgSrc, imgAlt, name, distance, description, link, favorite } =
    foodItem;
  const container = document.createElement("div");

  container.className = "food-detail-container";
  const convertStarImg = favorite ? "./filled-star.png" : "./empty-star.png";
  container.innerHTML = `
      <div class="food-detail">
        <img src=${convertStarImg} alt="즐겨찾기버튼" class="restaurant-star">
        <div class="restaurant__category">
            <img src=${imgSrc} alt=${imgAlt} class="category-icon">
          </div>
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="text-body food_detail_description">${description}</p>
          <p class="restaurant__link text-body">${link}</p>
      </div>
      `;

  container.appendChild(
    ButtonContainer({
      buttons: [
        Button({
          cssType: "secondary",
          innerText: "삭제하기",
          onClick: () => deleteFoodItem(filter, foodItem, modal),
        }),
        Button({
          cssType: "primary",
          innerText: "닫기",
          onClick: Modal.close,
        }),
      ],
    })
  );

  return container;
  s;
}
