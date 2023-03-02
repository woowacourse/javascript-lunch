import { OPTIONS } from "../constants/options";

type SelectId = keyof typeof OPTIONS;

class CustomSelect extends HTMLElement {
  constructor() {
    super();

    const name = this.getAttribute("name");
    const id = this.getAttribute("id") as SelectId;
    const className = this.getAttribute("className");
    const required = this.getAttribute("required");

    this.innerHTML = `
        <select name=${name} id=${id} class=${className} required=${required}>
          ${OPTIONS[id].text
            .map(
              (optionText, index) =>
                `<option value=${OPTIONS[id].value[index]}>${optionText}</option>`
            )
            .join("")}
        </select>
    `;
  }
}

const createCustomSelect = () => {
  customElements.define("custom-select", CustomSelect);
};

export default createCustomSelect;
