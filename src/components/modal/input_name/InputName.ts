import { inputNameTemplate } from "./template";
import restaurantStateStore from "../../../store/RestaurantStateStore";
import convertHTMLStringToDOM from "../../../utils/convertHTMLStringToDOM";
import removeHTMLElementByClassName from "../../../utils/removeHTMLElementByClassName";
import { inputNameHandler } from "./handlers";

function InputName(form: Element) {
  const render = () => {
    form.appendChild(convertHTMLStringToDOM(inputNameTemplate));

    inputNameHandler();
  };

  render();
}

export default InputName;
