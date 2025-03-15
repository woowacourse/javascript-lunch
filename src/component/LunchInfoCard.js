const CATEGORY_ICON = {
  한식: "./category-korean.png",
  중식: "./category-chinese.png",
  일식: "./category-japanese.png",
  양식: "./category-western.png",
  아시안: "./category-asian.png",
  기타: "./category-etc.png",
};

function LunchInfoCard({ category, name, distance, description }) {
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
