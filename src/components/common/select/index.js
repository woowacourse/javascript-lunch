import { INPUT_HELP_TEXT } from "../../../constants/inputHelpText";
import { createElement } from "../../../utils/createElement";

const Select = ({
  name,
  required = false,
  options,
  hasDefaultOption = false,
  onChange,
}) => {
  const select = createElement(/*html*/ `
    <select name=${name} id=${name} ${required ? "required" : ""}>
    </select>
  `);

  if (!hasDefaultOption) {
    const defaultOption = document.createElement("option");
    defaultOption.setAttribute("value", "");
    defaultOption.textContent = INPUT_HELP_TEXT.SELECT_PLACEHOLDER;
    select.appendChild(defaultOption);
  }

  options.forEach((option) => {
    const optionTag = document.createElement("option");

    optionTag.setAttribute("value", option.value);
    optionTag.textContent = option.label;

    select.appendChild(optionTag);
  });

  select.addEventListener("change", onChange);

  return select;
};

export default Select;
