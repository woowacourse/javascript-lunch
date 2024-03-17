import restaurantStateStore from "../../../store/RestaurantStateStore";
import { Idistance } from "../../../types/distance";
import removeHTMLElementByClassName from "../../../utils/removeErrorMessageByClassName";

const changeDistanceHandler = (select: HTMLElement) => {
  select.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = Number(event.target.value) as Idistance;
      removeHTMLElementByClassName("invalid_distance");
      restaurantStateStore.setDistance(selectedValue);
    }
  });
};

const distanceEventHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const select = document.getElementById("distance") as HTMLElement;

    changeDistanceHandler(select);
  });
};
export default distanceEventHandler;
