import Component from '../../core/Component.ts';
import { html } from '../../lib/utils.ts';

interface ButtonProps {
  type: string;
  class: string;
  message: string;
  dataAction: string;
}

export default class Button extends Component<null, ButtonProps> {
  override template() {
    return html` <button
      class="button text-caption ${this.props?.class}"
      ${this.props?.type ? `type = ${this.props?.type}` : ''}
      data-action="${this.props.dataAction}"
    >
      ${this.props?.message}
    </button>`;
  }
}
