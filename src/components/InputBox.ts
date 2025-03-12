import Component from '../core/Component.ts';
import { html } from '../lib/utils.ts';

interface InputBoxProps {
  label: string;
  input: string;
  caption?: string;
  isRequired?: boolean;
  labelId?: string;
}

export default class InputBox extends Component<InputBoxProps> {
  template() {
    return html`
      <div class="form-item ${this.props?.isRequired ? 'form-item--required' : ''}">
        <label for="${this.props?.labelId}" class="text-caption">${this.props?.label ?? ''}</label>
        ${this.props?.input ?? ''}
        <span class="help-text text-caption">${this.props?.caption ?? ''}</span>
      </div>
    `;
  }
}
