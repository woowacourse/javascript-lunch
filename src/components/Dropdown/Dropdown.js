import { label } from "../../constants/optionValue.js";
import Component from "../Component.js";
class Dropdown extends Component {
  constructor($target, props) {
    super($target, props);
  }
  template() {
    return `
          <label for="${this.$target.getAttribute("id")} text-caption">${label[this.$target.getAttribute("id")]}</label>
    <select name="${this.$target.getAttribute("id")}" class="option" required>
                  <option value="">선택해 주세요</option>
            </select>
            `;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
    this.updateOptions();
  }

  updateOptions() {
    const optionValue = this.props;
    for (const [key, value] of Object.entries(optionValue)) {
      this.$target.querySelector(".option").innerHTML +=
        `<option value="${key}">${value}</option>
`;
    }
  }
}

export default Dropdown;
