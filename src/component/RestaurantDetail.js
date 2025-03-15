import append from "../utils/append.js";
import toElement from "../utils/toElement.js";
import ButtonContainer from "./ButtonContainer.js";
import TextButton from "./TextButton.js";
import Modal from "./Modal.js";

const CATEGORY_ICON = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};

function RestaurantDetail({ category, name, distance, description, link }) {
  const $el = toElement(`<div class="restaurant__detail"></div>`);

  append(
    $el,
    toElement(`
    <div class="restaurant__detail">
        <div class="restaurant__category">
              <img src=${CATEGORY_ICON[category]} alt=${category} />
          </div>
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        ${
          description
            ? `<p class=".restaurant__detial__description text-body">${description}</p>`
            : ""
        }
        ${
          link
            ? `<p class=".restaurant__detial__link text-body">${link}</p>`
            : ""
        }
    </div>`),
    ButtonContainer([
      TextButton({
        id: "cancel__button",
        title: "삭제하기",
      }),
      TextButton({
        id: "add__button",
        title: "닫기",
        onClick: () => Modal.close(`restaurantModal_${name}`),
      }),
    ])
  );

  return $el;
}

export default RestaurantDetail;
