import { TypeInput } from "../../types/types";

const $input = ({ attribute, eventType, event }: TypeInput) => {
  const input = document.createElement("input");

  Object.assign(input, attribute);

  if (eventType && event) {
    input.addEventListener(eventType, event);
  }

  return input;
};

export default $input;
