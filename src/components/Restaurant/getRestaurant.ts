import { Restaurant } from "../../../types/global";

const getRestaurant = (data: Partial<Restaurant>) => {
  return `<div class="restaurant__category">
                   <img src=${data.imgSrc} alt=${data.imgAlt} class="category-icon"/>
                   </div>
                   <div class="restaurant__content">
                    <div class="restaurant__info">
                      <h3 class="restaurant__name text-subtitle">${data.name}</h3>
                      <span class="restaurant__distance text-body">캠퍼스부터 ${data.distance}분 내</span>
                      <p class="restaurant__description text-body">${data.description}</p>
                    </div>
                    <div class="iconButton_container" data-restaurant-id="${data.id}">
                    </div>
                   </div>
                   `;
};

export default getRestaurant;
