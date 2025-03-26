import { CATEGORY_ICON } from "../constants/constants.js";

function LunchInfoCard({ category, name, distance, description, favorite }) {
  return `
        <li class="restaurant" id="restaurant_${name}">
          <div class="restaurant__category">
              <img src=${CATEGORY_ICON[category]} alt=${category} />
          </div>
          <div class="restaurant__info">
              <h3 class="restaurant__name text-subtitle">${name}</h3>
              <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
              <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>
  `;
}

export default LunchInfoCard;
