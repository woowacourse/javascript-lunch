import { Component } from './core/index.ts';
import { html } from '../lib/utils.ts';

interface InputBoxProps {
  label: string;
  input: HTMLElement;
  labelId: string;
  caption?: string;
  isRequired?: boolean;
}

export default class InputBox extends Component<null, InputBoxProps> {
  override template() {
    return html`
      <div class="form-item ${this.props?.isRequired ? 'form-item--required' : ''}">
        <label for="${this.props.labelId}" class="text-caption">${this.props?.label ?? ''}</label>
        <section class="input-box"></section>
        <span class="help-text text-caption">${this.props?.caption ?? ''}</span>
      </div>
    `;
  }

  onRender(): void {
    this.appendChild(this.props?.input, '.input-box');
  }
}
