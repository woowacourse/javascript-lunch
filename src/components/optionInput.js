import { title } from "../constants/inputTitle.js";
import createElement from "../utils/createElement.js";

const getOptionValue = (name, option) => {
  if (name === "distance") {
    return `${option}분 내`;
  }

  return option;
};

const OptionInput = (name, options) => {
  const formItem = createElement({
    tag: "div",
    classList: ["form-item", "form-item--required"],
  });

  formItem.innerHTML = `
  <label for="${name}">${title[name]}</label>
                <select name=${name} id=${name}>
                  <option value="">선택해 주세요</option>
                ${options
                  .map(
                    (option) =>
                      `<option value="${option}">${getOptionValue(
                        name,
                        option
                      )}</option>`
                  )
                  .join("")}
                </select>
  `;

  return formItem;
};

export default OptionInput;
