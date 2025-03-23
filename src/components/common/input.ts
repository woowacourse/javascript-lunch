import { BaseField } from "../../types/formFieldsType";

const $input = ({ attribute, eventType, event }: BaseField) => {
  const input = document.createElement("input");

  Object.assign(input, attribute);

  if (eventType && event) {
    input.addEventListener(eventType, event);
  }

  return input;
};

export default $input;
