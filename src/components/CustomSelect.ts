import OPTIONS from "../constants/options";

type SelectId = keyof typeof OPTIONS;

class CustomSelect extends HTMLSelectElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const id = this.getAttribute("id");

    if (id === null) return;
    if (!this.isSelectId(id)) return;

    this.innerHTML = `
      ${OPTIONS[id].text
        .map(
          (optionText, index) =>
            `<option value=${OPTIONS[id].value[index]}>${optionText}</option>`
        )
        .join("")}
    `;
  }

  isSelectId(id: string): id is SelectId {
    return Object.keys(OPTIONS).includes(id);
  }
}

export default CustomSelect;
