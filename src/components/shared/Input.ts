import CustomFormElement from '../CustomFormElement';

class Input extends CustomFormElement {
  override renderTemplate(): string {
    return `
      <style>
        input {
          padding: 8px;
          margin: 6px 0;

          border: 1px solid var(--grey-200);
          border-radius: 8px;

          font-size: 16px;
          width: 100%;
        }
      </style>
      <input>
    `;
  }
}

customElements.define('r-input', Input);

export default Input;
