import changeModalContents from "../ui/changeModalContents";
import { $ } from "../utils/dom";

const clickCard = (restaurant, restaurantList) => {
  $("#restaurant-detail-modal-backdrop").classList.add("open");
  changeModalContents(restaurant, restaurantList);
};

export default clickCard;
