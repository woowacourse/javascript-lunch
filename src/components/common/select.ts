import { TypeSelect } from "../../types/types";

const $select = ({ attribute, options, eventType, event }: TypeSelect) => {
  const select = document.createElement("select");
  Object.assign(select, attribute);

  Object.keys(options).forEach((selectName) => {
    const option = document.createElement("option");
    option.value = options[selectName];
    option.textContent = selectName;
    select.appendChild(option);
  });

  if (eventType && event) {
    select.addEventListener(eventType, event);
  }

  return select;
};

export default $select;
