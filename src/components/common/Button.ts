import { Component } from '../core/index.ts';
import { html } from '../../lib/utils.ts';

interface ButtonProps {
  type: string;
  class: string;
  message: string;
  dataAction: string;
  dataId?: string;
}

export default class Button extends Component<ButtonProps> {
  override template() {
    return html` <button
      class="button text-caption ${this.props.class}"
      ${this.props.type ? `type = ${this.props.type}` : ''}
      data-action="${this.props.dataAction}"
      ${this.props.dataId ? `data-id="${this.props.dataId}"` : ''}
    >
      ${this.props.message}
    </button>`;
  }
}
