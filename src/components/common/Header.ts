import Component from '../Component';

class Header extends Component {
  override renderTemplate() {
    return `
      <style>
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 64px;

          padding: 0 16px;

          background-color: var(--primary-color);
          color: #fcfcfd;
        }

        ::slotted(button) {
          height: 40px;

          border: none;
          border-radius: 8px;
          background: transparent;

          font-size: 24px;
          cursor: pointer;
        }
      </style>

      <header>
        <h2>${this.getAttribute('title') ?? ''}</h2>

        <slot name="actions"></slot>
      </header>
    `;
  }
}

customElements.define('r-header', Header);

export default Header;
