import inputTitle from "../constants/inputTitle.js";

const textArea = (name, helpText, colRow = { col: 30, row: 5 }) => {
  const formItem = document.createElement("div");
  formItem.classList.add("form-item");

  formItem.innerHTML = `
    <label for=${name} class="text-caption">${
    inputTitle[name.toUpperCase()]
  }</label>
    <textarea
      name=${name}
      id=${name}
      cols=${colRow.col}
      rows=${colRow.row}
    ></textarea>
    <span class="help-text text-caption"
      >${helpText}</span
    >
  `;

  return formItem;
};

export default textArea;
