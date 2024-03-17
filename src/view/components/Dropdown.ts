class Dropdown extends HTMLSelectElement {
  connectedCallback() {
    this.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      const restaurantList = document.querySelector('.restaurant-list');
      restaurantList?.setAttribute(`data-${this.id}`, target?.value);
    });
  }

  addOptions(options: string[]) {
    this.innerHTML = '';
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      this.appendChild(optionElement);
    });
  }
}

export default Dropdown;
