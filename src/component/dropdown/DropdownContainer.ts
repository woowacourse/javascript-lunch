import { Dropdown } from "./Dropdown.ts";

interface DropdownContainerOption {
  dropdowns: Dropdown[];
}

export class DropdownContainer {
  container;
  dropdowns;

  constructor({ dropdowns }: DropdownContainerOption) {
    this.container = document.createElement("div");
    this.container.classList.add("restaurant-filter-container");

    this.dropdowns = dropdowns;

    this.render();
  }

  get element() {
    return this.container;
  }

  render() {
    this.container.innerHTML = "";

    this.dropdowns.forEach((dropdown) => {
      if (dropdown.element) {
        this.container.appendChild(dropdown.element);
      }
    });
  }
}
