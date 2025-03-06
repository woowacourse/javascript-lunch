import Component from "./Component.js";
import { label } from "./optionValue.js";

class Input extends Component {
  constructor($target, props) {
    super($target, props);
  }
  template() {
    return `
    <label for="${this.$target.getAttribute("id")} text-caption">${label[this.$target.getAttribute("id")]}</label>
    <input type="text" name="${this.$target.getAttribute("id")}" id="${this.$target.getAttribute("id")}" ${this.props}>

            `;
  }
}

export default Input;
