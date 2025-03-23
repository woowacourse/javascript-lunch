import { SelectField } from "../../types/formFieldsType";

const $select = ({ attribute, options, eventType, event }: SelectField) => {
  const select = document.createElement("select");
  Object.assign(select, attribute);

  if (options) {
    Object.keys(options).forEach((optionName) => {
      const option = document.createElement("option");
      option.value = String(options[optionName]);
      option.textContent = optionName;
      select.appendChild(option);
    });
  }

  if (eventType && event) {
    select.addEventListener(eventType, event);
  }

  return select;
};

export default $select;
