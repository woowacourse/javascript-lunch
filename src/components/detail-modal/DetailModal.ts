import { Irestaurant } from "../../types/restaurant";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import detailModalTemplate from "./detailModalTemplate";
import ModalButtons from "./modal-button/ModalButtons";

const DetailModal = (restaurant: Irestaurant) => {
  document.body.appendChild(
    convertHTMLStringToDOM(detailModalTemplate(restaurant)),
  );

  ModalButtons();
};
export default DetailModal;
