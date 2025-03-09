import { INPUT_HELP_TEXT } from "../../../constants/inputHelpText";
import { createElement } from "../../../utils/createElement";

const Select = ({ name, required, options }) => {
  const select = createElement(/*html*/ `
    <select name=${name} id=${name} required=${required}>
      <option value="">${INPUT_HELP_TEXT.SELECT_PLACEHOLDER}</option>
    </select>
  `);

  for (const [key, value] of Object.entries(options)) {
    const optionTag = document.createElement("option");

    optionTag.setAttribute("value", key);
    optionTag.textContent = value;

    select.appendChild(optionTag);
  }

  return select;
};

export default Select;
