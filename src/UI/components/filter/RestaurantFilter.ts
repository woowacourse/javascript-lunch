class RestaurantFilter {
  protected element: HTMLSelectElement;
  protected options: { value: string; text: string }[];
  protected onChange?: (value: string) => void;

  constructor(options: { value: string; text: string }[] = [], onChange?: (value: string) => void) {
    this.options = options;
    this.onChange = onChange;
    this.element = this.#createFilter();
    this.#addOptions();
    this.#bindEvents();
  }

  #createFilter(): HTMLSelectElement {
    const filter = document.createElement('select');
    filter.classList.add('restaurant-filter');
    return filter;
  }

  #addOptions(): void {
    this.options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      this.element.appendChild(optionElement);
    });
  }

  #bindEvents(): void {
    if (this.onChange) {
      this.element.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.onChange!(target.value);
      });
    }
  }

  getElement(): HTMLSelectElement {
    return this.element;
  }

  getValue(): string {
    return this.element.value;
  }
}

export default RestaurantFilter;
