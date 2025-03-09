import Component from '../core/Component.ts';

interface ButtonProps {
  type: string;
  class: string;
  id: string;
  message: string;
}

export default class Button extends Component<null, ButtonProps> {
  template() {
    return `
     <button
        type=${this.props.type}
        class="button ${this.props.class} text-caption"
        id=${this.props.id}
      >
      ${this.props.message}
    </button>`;
  }
}
