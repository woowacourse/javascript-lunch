import RComponent from './RComponent';

class RButton extends RComponent {
  renderTemplate(): string {
    return `
        <style>
            button {
                width: 100%;
                height: 44px;

                margin-right: 16px;

                border: none;
                border-radius: 8px;

                font-weight: 600;
                cursor: pointer;    

                background: var(--primary-color);

                color: var(--grey-100);
            }
        </style>
        <button class="text-caption">추가하기</button>
    `;
  }
}

customElements.define('r-button', RButton);

export default RButton;
