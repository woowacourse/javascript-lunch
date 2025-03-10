import FormFieldContainer from "./FormFieldContainer.js";
import RULES from "../../../constants/rules.js";

const RestaurantName = () => {
  const label = "이름";
  const name = "name";
  const required = true;

  const contents = /*html*/ `
    <input type="text" name="name" id="name" required minlength="${RULES.MIN_RESTAURANT_NAME}" maxlength="${RULES.MAX_RESTAURANT_NAME}" data-testid="restaurant-name"/>
  `;

  return FormFieldContainer({ contents, required, label, name });
};

export default RestaurantName;
