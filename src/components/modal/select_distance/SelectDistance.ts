import restaurantStateStore from "../../../store/RestaurantStateStore";
import { Idistance } from "../../../types";
import { selectDistanceTemplate } from "./template";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import removeHTMLElementByClassName from "../../../utils/removeHTMLElementByClassName";

function SelectDistance() {
  const render = (form: Element) => {
    form.appendChild(convertHTMLStringToDOM(selectDistanceTemplate));

    distanceChange();
  };

  const distanceChange = () => {
    document.addEventListener("DOMContentLoaded", () => {
      const select = document.getElementById("distance");

      if (select) {
        select.addEventListener("change", (event) => {
          if (event.target instanceof HTMLSelectElement) {
            const selectedValue = Number(event.target.value) as Idistance;
            restaurantStateStore.setDistance(selectedValue);
            removeHTMLElementByClassName("invalid_distance");
            return selectedValue;
          }
        });
      }
    });
  };

  return {
    render,
  };
}

export default SelectDistance;
