import { $ } from "../../utils/domHelpers";

const input = (props) => {
  const { labelText, id, isRequired = false, spanText = "" } = props;

  const required = isRequired ? "required" : "";

  return `
        <label for="${id} text-caption">${labelText}</label>
        <input type="text" name=${id} id=${id} ${required} maxLength='20'/>
        <span class="help-text text-caption">${spanText}</span>
    `;
};

export default input;
