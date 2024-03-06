class Dropdown extends HTMLSelectElement {
  connectedCallback() {
    console.log('Component added to DOM');
  }

  addOptions(options) {
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      this.appendChild(optionElement);
    });
  }
}

export default Dropdown;
