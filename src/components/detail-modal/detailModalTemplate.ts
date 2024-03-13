/* eslint-disable max-lines-per-function */
import { Irestaurant } from "../../types/restaurant";
import { getMatchedCategoryInfo } from "../restaurant/Restaurant";
import {
  categoryTemplate,
  descriptionTemplate,
  distanceTemplate,
  likeTemplate,
  restaurantNameTemplate,
} from "../restaurant/restaurantInfoTemplate";

const detailModalTemplate = (restaurant: Irestaurant) => /*html*/ `
<div class="detail-modal">
  <div class="modal-backdrop detail-modal-dackdrop"></div>
  <div class="modal-container">
 ${categoryTemplate(getMatchedCategoryInfo(restaurant))}
 ${likeTemplate(restaurant.isLike)}
 ${restaurantNameTemplate(restaurant.name)} ${distanceTemplate(restaurant.distance)}
 ${descriptionTemplate(restaurant.description)}
    <form id="modal-form" class="modal-form"></form>
  </div>
</div>`;
export default detailModalTemplate;
