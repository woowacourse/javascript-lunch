import { $ } from '../utils';

class RestaurantTab extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });

    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
      .select {
        text-align: center;
        padding-bottom: 9px;
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
      }
    `;

    const name = this.getAttribute('name');

    this.shadowRoot.innerHTML = `
    <div class="select">${name}</div>
    `;

    this.shadowRoot.append(componentStyle);
    this.initSetting();
    this.selectEvent();
  }

  initSetting() {
    const id = this.getAttribute('id');
    if (id === 'favoriteTab') {
      this.notSelect();
    }
  }

  selectEvent() {
    $('#allTab').addEventListener('click', () => {
      $('#allTab').select();
      $('#favoriteTab').notSelect();
    });

    $('#favoriteTab').addEventListener('click', () => {
      $('#allTab').notSelect();
      $('#favoriteTab').select();
    });
  }

  select() {
    this.shadowRoot.querySelector('div').classList.remove('not-select');
  }

  notSelect() {
    this.shadowRoot.querySelector('div').classList.add('not-select');
  }

  static get observedAttributes() {
    return ['name'];
  }
}

export default RestaurantTab;
