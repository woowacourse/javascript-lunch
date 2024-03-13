import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import detailModalTemplate from "./detailModalTemplate";
import { clickRestaurantModal, dimmerClickHandler } from "./handlers";

const DetailModal = () => {
  document.body.appendChild(convertHTMLStringToDOM(detailModalTemplate));

  clickRestaurantModal();
  dimmerClickHandler();
};
export default DetailModal;
