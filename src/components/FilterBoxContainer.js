class FilterBoxContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  setEvent() {}

  removeEvent() {}

  template() {
    return `
      <section class="restaurant-filter-container">
          <filter-box class="category" option="category"></filter-box>
          <filter-box class="sorting" option="sorting"></filter-box>
      </section>
    `;
  }
}

export default FilterBoxContainer;
