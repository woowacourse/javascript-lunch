import { Irestaurant } from "../../types/restaurant";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import ModalButtons from "./detail-modal-button/ModalButtons";
import detailModalTemplate from "./detailModalTemplate";

const DetailModal = (restaurant: Irestaurant) => {
  document.body.appendChild(
    convertHTMLStringToDOM(detailModalTemplate(restaurant)),
  );

  ModalButtons(restaurant);
};
export default DetailModal;
