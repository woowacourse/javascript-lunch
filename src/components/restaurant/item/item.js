import { CATEGORY_ICON } from "../../../settings/settings";

function setDataset(element, data) {
  Object.keys(data).forEach((key) => {
    element.dataset[key] = data[key];
  });
}

//정리필요.

export default function createRestaurantItem({
  category,
  name,
  distance,
  description,
  link,
  isFavorite,
}) {
  const restaurantItem = createElement("li", {
    className: "restaurant",
    id: name,
  });

  setDataset(restaurantItem, {
    name: name,
    distance: distance,
    category: category,
  });

  restaurantItem.innerHTML = `
  <div class="restaurant__category">
    <img
      src="${CATEGORY_ICON[category]}"
      alt="${category}"
      class="category-icon"
    />
  </div>
  <div class="restaurant__info">

    <div class="restaurant__header"> 
      <div> 
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body"
        >캠퍼스부터 ${distance}분 내</span
      >
      </div>
       <img src="${
         isFavorite ? "./Star.png" : "./Un-star.png"
       }" class="favorite-icon"/>
    </div>
   
  
    <p class="restaurant__description text-body">
      ${description}
    </p>
    
  </div>
  `;

  return restaurantItem;
}
