import { Irestaurant } from "../../types/restaurant";
import ModalBase from "../common/modal/modal";
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
${ModalBase(restaurantInfoTemplate(restaurant), "detail-modal", "detail-modal-backdrop", "detail-modal-container")}
`;
export default detailModalTemplate;
