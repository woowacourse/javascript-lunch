import restaurantStateStore from "../../../store/RestaurantStateStore";
import { Idistance } from "../../../types/distance";
import removeErrorMessageById from "../../../utils/removeErrorMessageById";

const changeDistanceHandler = (select: HTMLElement) => {
  select.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = Number(event.target.value) as Idistance;
      removeErrorMessageById("invalid_distance");
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
