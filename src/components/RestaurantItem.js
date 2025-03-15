import emptyStar from "../../public/icons/emptyStar.svg";
import filledStar from "../../public/icons/filledStar.svg";

const CATEGORY_IMAGES = Object.freeze({
  한식: "category-korean.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  양식: "category-western.png",
  아시안: "category-asian.png",
  기타: "category-etc.png",
});

const imageSource = (category) => {
  return CATEGORY_IMAGES[category];
};

const RestaurantItem = ({
  category,
  name,
  distance,
  description,
  id,
  isFavorite,
}) => {
  return /* html */ `
    <li id="${id}" class="restaurant">
      <button data-buttonId="${id}" type='button' class="favorite-icon-button">
        <img src=${isFavorite ? filledStar : emptyStar} class="favorite-icon"/>
      </button> 
      <div class="restaurant__category">
        <img src="./icons/${imageSource(
          category
        )}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
    </li>
  `;
};

export default RestaurantItem;
