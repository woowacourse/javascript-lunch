import { Irestaurant } from "../../types/restaurant";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import detailModalTemplate from "./detailModalTemplate";

const DetailModal = (restaurant: Irestaurant) => {
  document.body.appendChild(
    convertHTMLStringToDOM(detailModalTemplate(restaurant)),
  );
};
export default DetailModal;
