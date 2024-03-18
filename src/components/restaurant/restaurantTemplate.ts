import { Irestaurant } from "../../types/restaurant";

import {
  descriptionSummaryTemplate,
  distanceTemplate,
  likeTemplate,
  restaurantNameTemplate,
} from "./restaurantInfoTemplate";

export const InfoTemplate = (restaurant: Irestaurant) => /*html*/ `
<div class="restaurant__info">
  ${restaurantNameTemplate(restaurant.name)} 
  ${distanceTemplate(restaurant.distance)}
  ${descriptionSummaryTemplate(restaurant.description)}
</div>`;

export const restaurantTemplate = (
  id: number,
  categoryTemplate: string,
  restaurant: Irestaurant,
) => /*html*/ `
<li id="${id}" class="restaurant">${categoryTemplate}${InfoTemplate(restaurant)}${likeTemplate(restaurant.isLike)}</li>
`;
