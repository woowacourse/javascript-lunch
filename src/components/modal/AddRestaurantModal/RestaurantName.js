import FormFieldContainer from "./FormFieldContainer";

const RestaurantName = () => {
  const label = "이름";
  const name = "name";
  const required = true;
  const contents = /*html*/ `
  <input type="text" name="name" id="name" required maxlength="15" data-testid="restaurant-name"/>
  `;

  return FormFieldContainer({ contents, required, label, name });
};

export default RestaurantName;
