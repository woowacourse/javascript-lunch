import { notifyFilterChange, notifySortChange } from "../../managers/eventManagers.ts";

type DropdownFeatureType = "filter" | "sort";

interface OptionType {
  value: string;
  label: string;
}

interface DropdownOption {
  name: string;
  options: OptionType[];
  type: DropdownFeatureType;
}

export class Dropdown {
  container: HTMLElement;
  name: string;
  options: OptionType[];
  type: DropdownFeatureType;

  #selectValue: string;

  constructor({ name, options, type }: DropdownOption) {
    this.container = document.createElement("div");
    this.options = options;
    this.name = name;

    this.type = type;
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

        if (target && this.type === "filter") {
          this.#selectValue = target.value;
          notifyFilterChange(this.#selectValue);
        }
        if (target && this.type === "sort") {
          this.#selectValue = target.value;
          notifySortChange(this.#selectValue);
        }
      }),
    );
  }
}
