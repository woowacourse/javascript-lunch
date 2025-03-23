import { CATRGORY_IMAGE_PATH } from "../constants/constant.ts";

function ListItem({ category, name, distance, description, favoriteStar }) {
  const listElement = document.createElement("li");
  listElement.dataset.name = name;
  listElement.classList.add("restaurant");
  listElement.innerHTML = /*html*/ `
    <div class="restaurant__category">
      <img src=${CATRGORY_IMAGE_PATH[category]} alt=${category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <div class="restaurant__top">
        <div>
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}</span>
        </div>
        <div 
          class="favorite-star ${favoriteStar && "active"}"}
          data-name="${name}"
        ></div>
      </div>
      <p class="restaurant__description text-body">
        ${description}
      </p>
    </div>
    `;
  return listElement;
}

export default ListItem;
