import Component from '../core/Component.js';

class Button extends Component {
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

export default Button;
