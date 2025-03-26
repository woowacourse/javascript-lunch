import { title } from "../constants/inputTitle.js";
import createElement from "../utils/createElement.js";

const TextArea = (name, helpText, colRow = { col: 30, row: 5 }) => {
  const formItem = createElement({ tag: "div", classList: ["form-item"] });

  formItem.innerHTML = `
  <label for="${name}">${title[name]}</label>
                <textarea
                  name="${name}"
                  id="${name}"
                  cols="${colRow.col}"
                  rows="${colRow.row}"
                ></textarea>
                <span class="help-text text-caption"
                  >${helpText}</span
                >
  `;

  return formItem;
};

export default TextArea;
