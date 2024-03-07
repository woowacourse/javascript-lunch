import { selectDistanceTemplate } from "./template";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import { distanceChange } from "./handlers";

function SelectDistance(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(selectDistanceTemplate));

    distanceChange();
  };

  render();
}

export default SelectDistance;
