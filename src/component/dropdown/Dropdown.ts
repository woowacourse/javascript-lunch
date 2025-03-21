interface OptionType {
  value: string;
  label: string;
}

interface DropdownOption {
  name: string;
  options: OptionType[];
  onChange: (selectValue: string) => {};
}

export class Dropdown {
  container: HTMLElement;
  name: string;
  options: OptionType[];
  onChange: (selectValue: string) => {};

  #selectValue: string;

  constructor({ name, options, onChange }: DropdownOption) {
    this.container = document.createElement("div");
    this.options = options;
    this.name = name;

    this.#selectValue = "이름순";

    this.onChange = onChange;

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
        const target = event.target;
        if (target instanceof HTMLSelectElement) {
          this.#selectValue = target.value;
          this.onChange(this.#selectValue);
        }
      }),
    );
  }
}
