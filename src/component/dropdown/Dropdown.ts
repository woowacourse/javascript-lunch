import { notifyFilterChange } from "../../managers/eventManagers.ts";

interface OptionType {
  value: string;
  label: string;
}

interface DropdownOption {
  name: string;
  options: OptionType[];
}

export class Dropdown {
  container: HTMLElement;
  name: string;
  options: OptionType[];

  #selectValue: string;

  constructor({ name, options }: DropdownOption) {
    this.container = document.createElement("div");
    this.options = options;
    this.name = name;

    this.#selectValue = "";

    this.render();
    this.setDropdownValue();
  }

  get selectValue() {
    return this.#selectValue;
  }

  get element() {
    return this.container.firstElementChild;
  }

  render() {
    this.container.innerHTML = `
        <select name=${this.name} id=${this.name}>
            ${this.options.map((option) => `<option value="${option.value}">${option.label}</option>`).join("")}
        </select>
    `;
  }

  setDropdownValue() {
    this.container.querySelectorAll("select").forEach((element) =>
      element.addEventListener("change", (event: Event) => {
        const target = event.target as HTMLSelectElement;
        if (target) {
          this.#selectValue = target.value;
          notifyFilterChange(this.#selectValue);
        }
      }),
    );
  }

  resetDropdownValue() {
    this.#selectValue = "";
  }
}
