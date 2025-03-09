import Component from '../core/Component.ts';

export default class Button extends Component {
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
