import FormControlComponent from '../FormControlComponent';

class Textarea extends FormControlComponent {
  override renderTemplate() {
    return `
      <style>
        :host {
          display: block;
          position: relative;
        }

        textarea {
          display: block;
          padding: 8px;
          margin: 6px 0;

          border: 1px solid var(--grey-200);
          border-radius: 8px;

          font-size: 16px;
          width: 100%;
          resize: none;
        }

        label {
          font-size: 14px;
          color: var(--grey-400);
        }

        :host([required]) label::after {
          padding-left: 4px;
          content: '*';
          color: var(--primary-color);
        }

        :host::after {
          position: absolute;
          top: 100%;
          font-size: 0.8rem;
        }

        :host(:valid)::after {
          content: attr(helper-text);
          color: var(--grey-300);
        }

        :host(:invalid) textarea {
          border-color: red;
          box-shadow: 0 0 5px rgba(255, 0, 0, 0.3);
        }

        :host(:invalid)::after {
          content: attr(validation-message);
          color: red;
        }
      </style>

      <label for="form-control">${this.getAttribute('title') ?? ''}</label>
      <textarea id="form-control" oninput="this.host.onInput(event)" rows="${
        this.getAttribute('rows') ?? 4
      }"></textarea>
    `;
  }

  onInput(event: InputEvent) {
    if (event.target instanceof HTMLTextAreaElement) {
      this.internals.setFormValue(event.target.value);
    }
  }

  override validate() {
    if (this.hasAttribute('required') && !this.value) {
      this.internals.setValidity(
        { valueMissing: true },
        '값을 입력해야 합니다.',
        this.shadowRoot?.querySelector('textarea') ?? undefined,
      );
      return;
    }
    this.internals.setValidity({});
  }

  override get value() {
    return this.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea')?.innerText ?? '';
  }

  override formResetCallback() {
    this.shadowRoot!.querySelector<HTMLTextAreaElement>('textarea')!.innerText = '';
    this.internals.setValidity({});
  }
}

customElements.define('r-textarea', Textarea);

export default Textarea;
