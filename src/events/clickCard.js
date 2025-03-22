import renderModalContents from "../ui/renderModalContents";
import { $ } from "../utils/dom";

const clickCard = (restaurant, restaurantList) => {
  $("#restaurant-detail-modal-backdrop").classList.add("open");
  renderModalContents(restaurant, restaurantList);
};

export default clickCard;
