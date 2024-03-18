import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import distanceEventHandler from "./handlers";
import selectDistanceTemplate from "./selectDistanceTemplate";

function SelectDistance(form: Element) {
  form.appendChild(convertHTMLStringToDOM(selectDistanceTemplate));

  distanceEventHandler();
}

export default SelectDistance;
