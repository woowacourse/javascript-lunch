import { title } from "../constants/inputTitle.js";

const getOptionValue = (name, option) => {
  if (name === "distance") {
    return `${option}분 내`;
  }

  return option;
};

const optionInput = (name, options) => {
  const formItem = document.createElement("div");
  formItem.classList.add("form-item");
  formItem.classList.add("form-item--required");

  formItem.innerHTML = `
  <label for="category text-caption">${title[name]}</label>
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

export default optionInput;
