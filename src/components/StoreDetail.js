import IMG_SRC from "../constants/imgSrc.js";
import createElement from "../utils/createElement.js";

const StoreDetail = ({
  name,
  category,
  dist,
  description,
  link,
  isFavorite,
}) => {
  return `
    <div class="category-favorite-icon-container">
              <div class="restaurant__category">
                <img
                  src="${IMG_SRC[category]}"
                  alt="category-img"
                  class="category-icon"
                />
              </div>
              <img
                src="${
                  isFavorite
                    ? IMG_SRC.STAR_ICON_FILLED
                    : IMG_SRC.STAR_ICON_LINED
                }"
                alt="favorite-icon"
                class="star-icon"
              />
            </div>
            <h2 class="text-title restaurant__name">${name}</h2>
            <span class="restaurant__distance text-body info-distance"
              >캠퍼스로부터 ${dist}분 내</span
            >
            <span class="text-body"
              >${description}</span
            >
            <a href="${link}" class="info-link"
              >${link}</a
            >
  `;
};

export default StoreDetail;
