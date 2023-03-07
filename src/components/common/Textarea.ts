import FormControlComponent from '../FormControlComponent';

class Textarea extends FormControlComponent {
  override renderTemplate() {
    return `
      <style>
        textarea {
          padding: 8px;
          margin: 6px 0;

          border: 1px solid var(--grey-200);
          border-radius: 8px;

          font-size: 16px;
          width: 100%;
          resize: none;
        }
      </style>
      <textarea rows="4"></textarea>
    `;
  }

  override render() {
    super.render();

    this.shadowRoot
      ?.querySelector<HTMLTextAreaElement>('textarea')
      ?.addEventListener('input', (event) => {
        if (event.target instanceof HTMLTextAreaElement) {
          this.internals.setFormValue(event.target.value);
        }
      });
  }

  override get value() {
    return document.querySelector<HTMLTextAreaElement>('textarea')?.innerText ?? '';
  }
}

customElements.define('r-textarea', Textarea);

export default Textarea;
