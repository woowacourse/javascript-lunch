import { CATEGORY_ICON } from "../../settings/settings";
export default function createRestaurantDescription({
  category,
  name,
  distance,
  description,
  link,
  isFavorite,
}) {
  const restaurantItem = createElement("div", {
    className: "restaurant-description",
  });

  restaurantItem.innerHTML = `
    <div class="restaurant__category description__icon">
      <img
        src="${CATEGORY_ICON[category]}"
        alt="${category}"
        class="category-icon"
      />
    </div>
    <div class="restaurant__info">
        
      <div class="restaurant__header description__header"> 
        <div> 
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body"
          >캠퍼스부터 ${distance}분 내</span
        >
        </div>
         <img src="${
           isFavorite ? "./Star.png" : "./Un-star.png"
         }" class="favorite-icon" id="description-favorite" />
      </div>
     
     <div class="description__contents">
      <p class="restaurant__description text-body">
        ${description}
      </p>
       <p class="restaurant__description text-body">
         ${link}
      </p>
     </div>
      <div class="button-container">
        <button type="button" class="button button--secondary text-caption" id="delete-button">삭제하기</button>
        <button type="button" class="button button--primary text-caption" id="close-button">닫기</button>
      </div>
      
    </div>
    `;
  return restaurantItem;
}
