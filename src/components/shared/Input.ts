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

  render(): void {
    super.render();

    this.shadowRoot
      ?.querySelector<HTMLInputElement>('input')
      ?.addEventListener('input', (event) => {
        if (event.target instanceof HTMLInputElement) {
          this.internals.setFormValue(event.target.value);
        }
      });
  }

  get value() {
    return document.querySelector<HTMLInputElement>('input')?.value ?? '';
  }
}

customElements.define('r-input', Input);

export default Input;
