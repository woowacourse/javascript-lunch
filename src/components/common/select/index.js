import { INPUT_HELP_TEXT } from "../../../constants/inputHelpText";

const Select = (name, required, options) => {
  const select = document.createElement("select");
  select.setAttribute("name", name);
  select.setAttribute("id", name);
  select.toggleAttribute("required", required);

  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("value", "");
  defaultOption.textContent = INPUT_HELP_TEXT.SELECT_PLACEHOLDER;
  select.appendChild(defaultOption);

  for (const [key, value] of Object.entries(options)) {
    const optionTag = document.createElement("option");

    optionTag.setAttribute("value", key);
    optionTag.textContent = value;

    select.appendChild(optionTag);
  }

  return select;
};

export default Select;
