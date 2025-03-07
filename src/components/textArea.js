import { title } from "../constants/inputTitle.js";

const textArea = (name, helpText, colRow = { col: 30, row: 5 }) => {
  const formItem = document.createElement("div");
  formItem.classList.add("form-item");

  formItem.innerHTML = `
  <label for="${name} text-caption">${title[name]}</label>
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

export default textArea;
