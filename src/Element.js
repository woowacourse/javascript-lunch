import { Restaurant } from "./type/restaurant";
import { IMAGE } from "./util/ImageLoader";
import { $ } from "./util/querySelector";

const Elements = {
  appendNewRestaurant({ category, name, distance, description }) {
    const listTemplate = $("#list-template");
    const listClone = document.importNode(listTemplate.content, true);

    listClone.querySelector(".restaurant__name").textContent = name;
    listClone.querySelector(".restaurant__distance").textContent = `${distance}분 내`;
    listClone.querySelector(".restaurant__description").textContent =
      description;
    listClone.querySelector(".category-icon").src = IMAGE[category];
    
    $(".restaurant-list-container").appendChild(listClone);
  },
};

export default Elements;
