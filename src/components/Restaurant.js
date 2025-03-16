import StarIcon from "./StarIcon";
import IMG_SRC from "../constants/imgSrc";

const Restaurant = (restaurantProps, isDetail = false) => {
  const imgSrc = getImgSrc(restaurantProps.category);

  return /*html*/ ` 
    <div class="restaurant__category">
      <img src="${imgSrc}" alt=${
    restaurantProps.category
  } class="category-icon" />
    </div>
    </div>
    <div class="restaurant__info ${isDetail ? "restaurant__info_detail" : ""}">
      <div class="restaurant__info_header">
        <div>
          <h3 class="restaurant__name text-subtitle">${
            restaurantProps.name
          }</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${
            restaurantProps.dist
          }분 내</span>
        </div>
        ${StarIcon(restaurantProps.isFavorite).outerHTML}
      </div>
      <p class="restaurant__description text-body ${
        isDetail ? "restaurant__description_detail" : ""
      }">
        ${restaurantProps.description}
      </p>
      ${
        restaurantProps.link && isDetail
          ? `<a href="${restaurantProps.link}" class="restaurant__link">${restaurantProps.link}</a>`
          : ""
      }
    </div>
    
    `;
};

const getImgSrc = (category) => {
  return IMG_SRC[category];
};

export default Restaurant;
