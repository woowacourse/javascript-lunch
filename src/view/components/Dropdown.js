class Dropdown extends HTMLSelectElement {
  connectedCallback() {
    this.addEventListener('change', (event) => {
      const restaurantList = document.querySelector('.restaurant-list');
      restaurantList.setAttribute(`data-${this.id}`, event.target.value);
    });
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
