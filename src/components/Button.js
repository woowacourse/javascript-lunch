import Component from "../core/Component";

const ButtonType = ["primary", "secondary"];

class Button extends Component {
  constructor(props) {
    super(props);
  }

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
