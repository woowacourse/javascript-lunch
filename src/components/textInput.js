import inputTitle from "../constants/inputTitle.js";

const textInput = (name, isRequired, helpText) => {
  const formItem = document.createElement("div");
  formItem.classList.add("form-item");
  if (isRequired) formItem.classList.add("form-item--required");

  formItem.innerHTML = `
                <label for=${name} class="text-caption">${
    inputTitle[name.toUpperCase()]
  }</label>
                <input type="text" name=${name} id=${name} />
  `;

  if (helpText) {
    const span = document.createElement("span");
    span.classList.add("help-text");
    span.classList.add("text-caption");
    span.innerText = helpText;
    formItem.appendChild(span);
  }

  return formItem;
};

export default textInput;
