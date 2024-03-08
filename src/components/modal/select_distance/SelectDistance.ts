import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";

import { distanceChange } from "./handlers";
import selectDistanceTemplate from "./selectDistanceTemplate";

function SelectDistance(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(selectDistanceTemplate));

    distanceChange();
  };

  render();
}

export default SelectDistance;
