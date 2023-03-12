import RComponent from './RComponent';

class RFormItem extends RComponent {
  renderTemplate(): string {
    return `
      <style>
        label {
          color: var(--grey-400);
        }

        span {
          color: var(--grey-300);
        }

        label.required::after {
          padding-left: 4px;

          color: var(--primary-color);
          content: '*';
        }
        
        div {
          margin-bottom: 36px;
        }
      </style>

      <div>
        <label class="text-caption ${this.querySelector('[required]') ? 'required' : ''}">
          ${this.getAttribute('label') ?? ''}
        </label>
        <slot></slot>
        <span class="text-caption">
          ${this.getAttribute('helper-text') ?? ''}
        </span>
      </div>
    `;
  }
}

customElements.define('r-form-item', RFormItem);

export default RFormItem;