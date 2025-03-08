import { label } from "../../constants/optionValue.js";
import Component from "../Component.js";

class Input extends Component {
  constructor($target, props) {
    super($target, props);
  }
  template() {
    const { required, type } = this.props;
    return `
    <label for="${this.$target.getAttribute("id")} text-caption">${label[this.$target.getAttribute("id")]}</label>
    <input type="${type}" name="${this.$target.getAttribute("id")}" id="${this.$target.getAttribute("id")}" ${required}>

            `;
  }
}

export default Input;
