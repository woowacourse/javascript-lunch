import './style.css';

// TODO: 타입 폴더로 이동
type Color = 'red' | 'white';

type BtnType = 'submit' | 'reset' | 'button' | undefined;
class AddBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const color = this.getAttribute('color') as Color;
    const text = this.getAttribute('text');
    const type = this.getAttribute('type') as BtnType;
    this.innerHTML = `             
      <button
        type=${type || 'button'}
        class='btn-color-${color}'
      >
        ${text}
      </button>
    `;
  }
}
customElements.define('default-btn', AddBtn);
