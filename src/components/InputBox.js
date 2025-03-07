import Component from "../core/Component.js";

class InputBox extends Component {
  constructor(props) {
    super(props);
  }

  template() {
    return `
      <div class="form-item ${
        this.props?.isRequired ? "form-item--required" : ""
      }">
        <label for="category text-caption">${this.props.label}</label>
        ${this.props.input}
        <span class="help-text text-caption">${this.props.caption ?? ""}</span>
      </div>
    `;
  }
}

export default InputBox;
