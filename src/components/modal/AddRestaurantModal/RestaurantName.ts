import FormFieldContainer from "./FormFieldContainer.js";

export const NAME_LENGTH = {
  MIN: 1,
  MAX: 15,
} as const;

const RestaurantName = () => {
  const contents = /*html*/ `
    <input type="text" name="name" id="name" required minlength="${NAME_LENGTH.MIN}" maxlength="${NAME_LENGTH.MAX}" data-testid="restaurant-name-input"/>
  `;

  return FormFieldContainer({
    contents,
    required: true,
    label: "이름",
    name: "name",
  });
};

export default RestaurantName;
