import OPTIONS from "../constants/options";

type SelectId = keyof typeof OPTIONS | "";

export class CustomSelect extends HTMLSelectElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    const id = (this.getAttribute("id") as SelectId) ?? "";

    if (id !== "")
      this.innerHTML = `
      ${OPTIONS[id].text
        .map(
          (optionText, index) =>
            `<option value=${OPTIONS[id].value[index]}>${optionText}</option>`
        )
        .join("")}
    `;
  }

  bindEvent(handleOptionSelect: (value: string) => void) {
    this.addEventListener("change", () => {
      handleOptionSelect(this.value);
    });
  }
}

export const createCustomSelect = () => {
  customElements.define("custom-select", CustomSelect, { extends: "select" });
};
