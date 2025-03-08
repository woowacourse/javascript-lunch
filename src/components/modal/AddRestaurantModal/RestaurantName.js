import { RESTAURANT_RULES } from "../../../constants/rules.js";
import FormFieldContainer from "./FormFieldContainer.js";

const RestaurantName = () => {
  const { MIN_RESTAURANT_NAME, MAX_RESTAURANT_NAME } = RESTAURANT_RULES;

  const label = "이름";
  const name = "name";
  const required = true;

  const contents = /*html*/ `
    <input type="text" name="name" id="name" required minlength="${MIN_RESTAURANT_NAME}" maxlength="${MAX_RESTAURANT_NAME}" data-testid="restaurant-name"/>
  `;

  return FormFieldContainer({ contents, required, label, name });
};

export default RestaurantName;
