import FormFieldContainer from "./FormFieldContainer";

const RestaurantName = () => {
  const label = "이름";
  const name = "name";
  const required = true;

  const MAX_RESTAURANT_NAME = 15;
  const MIN_RESTAURANT_NAME = 1;

  const contents = /*html*/ `
    <input type="text" name="name" id="name" required maxlength="${MAX_RESTAURANT_NAME}" data-testid="restaurant-name"/>
  `;

  return FormFieldContainer({ contents, required, label, name });
};

export default RestaurantName;
