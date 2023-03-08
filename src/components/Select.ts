import OPTIONS from "../constants/options";

type SelectId = keyof typeof OPTIONS | "";

export class Select extends HTMLSelectElement {
  constructor() {
    super();
  }

  connectedCallback() {
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

export const createSelect = () => {
  customElements.define("custom-select", Select, { extends: "select" });
};
