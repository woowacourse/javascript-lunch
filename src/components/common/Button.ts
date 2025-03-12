import Component from '../../core/Component.ts';
import { html } from '../../lib/utils.ts';

interface ButtonProps {
  type: string;
  class: string;
  id: string;
  message: string;
}

export default class Button extends Component<null, ButtonProps> {
  template() {
    return html` <button
      class="button text-caption ${this.props?.class}"
      ${this.props?.type ? `type = ${this.props?.type}` : ''}
      ${this.props?.id ? `id = ${this.props?.id}` : ''}
    >
      ${this.props?.message}
    </button>`;
  }
}
