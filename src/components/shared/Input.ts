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

    const $input = this.querySelector<HTMLSelectElement>('input');
    if (!$input) return;

    $input.addEventListener('input', (event) => {
      if (event.target instanceof HTMLInputElement) {
        this.internals.setFormValue(event.target.value);
      }
    });
  }
}

customElements.define('r-input', Input);

export default Input;
