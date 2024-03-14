import { Irestaurant } from "../../types/restaurant";
import { getMatchedCategoryInfo } from "../restaurant/Restaurant";
import {
  categoryTemplate,
  descriptionTemplate,
  distanceTemplate,
  linkTemplate,
  modalLikeTemplate,
  restaurantNameTemplate,
} from "../restaurant/restaurantInfoTemplate";

const restaurantInfoTemplate = (restaurant: Irestaurant) => /*html*/ `
<div class="modal-top-content"> 
    ${categoryTemplate(getMatchedCategoryInfo(restaurant))}
    ${modalLikeTemplate(restaurant.isLike)}
</div>
${restaurantNameTemplate(restaurant.name)} ${distanceTemplate(restaurant.distance)}
${descriptionTemplate(restaurant.description)}
${linkTemplate(restaurant.link)}
`;

const detailModalTemplate = (restaurant: Irestaurant) => /*html*/ `
<div class="detail-modal">
  <div class="modal-backdrop detail-modal-dackdrop"></div>
  <div class="detail-modal-container">
    ${restaurantInfoTemplate(restaurant)}
  </div>
</div>`;
export default detailModalTemplate;
