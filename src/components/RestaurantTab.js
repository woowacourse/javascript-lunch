class RestaurantTab extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
  }

  select() {
    this.shadowRoot.querySelector('div').classList.remove('not-select');
  }

  notSelect() {
    this.shadowRoot.querySelector('div').classList.add('not-select');
  }

  isSelect() {
    return !this.shadowRoot
      .querySelector('div')
      .classList.contains('not-select');
  }

  static get observedAttributes() {
    return ['name'];
  }

  render() {
    const name = this.getAttribute('name');

    this.shadowRoot.innerHTML = `
    <div class="select">${name}</div>
    `;
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .select {
        text-align: center;
        padding: 9px 0;
        color: var(--primary-color);
        border-bottom: 2px solid var(--primary-color);
        cursor: pointer;

        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
      }

      .not-select{
        color: var(--grey-300);
        border-bottom: 2px solid var(--grey-300);
        transition: background-color 0.3s;
        border-radius:4px 4px 0 0;
      }

      .not-select:hover {
        background-color: var(--lighten-30-color);
        color: var(--grey-300);
        border-bottom: 2px solid var(--grey-300);
      }
    `;

    this.shadowRoot.append(componentStyle);
  }
}

export default RestaurantTab;
