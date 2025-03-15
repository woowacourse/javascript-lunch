interface DropdownOption {
  name: string;
  options: string[];
}

export class Dropdown {
  container: HTMLElement;
  name: string;
  options: string[];

  #selectValue: string;

  constructor({ name, options }: DropdownOption) {
    this.container = document.createElement("div");
    this.options = options;
    this.name = name;

    this.#selectValue = "";

    this.render();
    this.setSelectValue();
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
            ${this.options.map((option: string) => `<option value="${option}">${option}</option>`).join("")}
        </select>
    `;
  }

  setSelectValue() {
    this.container.querySelectorAll("select").forEach((element) =>
      element.addEventListener("click", (event: Event) => {
        const target = event.target as HTMLSelectElement;
        if (target) {
          this.#selectValue = target.value;
        }
      }),
    );
  }
}
