import append from "../utils/append.js";
import toElement from "../utils/toElement.js";
import ButtonContainer from "./ButtonContainer.js";
import TextButton from "./TextButton.js";
import Modal from "./Modal.js";
import RestaurantList from "../domain/RestaurantList.js";
import { CATEGORY_ICON } from "../constants/constants.js";
import FavoriteButton from "./FavoriteButton.js";
import { $ } from "../utils/querySelectors.js";
import RestaurantContainer from "./RestaurantContainer.js";

function RestaurantDetail(
  { category, name, distance, description, link, favorite },
  restaurantList
) {
  const $el = toElement(`<div class="restaurant__detail"></div>`);

  append(
    $el,
    toElement(`
    <div class="restaurant__detail">
        <div class="restaurant__detail__top">
          <div class="restaurant__category">
                <img src=${CATEGORY_ICON[category]} alt=${category} />
            </div>
        </div>
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        ${
          description
            ? `<p class="restaurant__detail__description text-body">${description}</p>`
            : ""
        }
        ${
          link
            ? `<p class="restaurant__detail__link text-body">${link}</p>`
            : ""
        }
    </div>`),
    ButtonContainer(
      TextButton({
        id: "remove__button",
        title: "삭제하기",
        onClick: () => {
          if (window.confirm(`${name}을(를) 삭제하시겠습니까?`)) {
            restaurantList.remove(name);
            RestaurantContainer(restaurantList);
            Modal.close(`restaurantModal_${name}`);
          }
        },
      }),
      TextButton({
        id: "cancel__button",
        title: "닫기",
        onClick: () => Modal.close(`restaurantModal_${name}`),
      })
    )
  );
  const favoriteParentEl = $el.querySelector(".restaurant__detail__top");
  FavoriteButton(favoriteParentEl, name, favorite, restaurantList);

  return $el;
}

export default RestaurantDetail;
