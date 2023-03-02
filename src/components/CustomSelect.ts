import OPTIONS from "../constants/options";

type SelectId = keyof typeof OPTIONS;

class CustomSelect extends HTMLSelectElement {
  constructor() {
    super();

    const id = (this.getAttribute("id") as SelectId) ?? "";

    this.innerHTML = `
      ${OPTIONS[id].text
        .map(
          (optionText, index) =>
            `<option value=${OPTIONS[id].value[index]}>${optionText}</option>`
        )
        .join("")}
    `;
  }
}

const createCustomSelect = () => {
  customElements.define("custom-select", CustomSelect, { extends: "select" });
};

export default createCustomSelect;
