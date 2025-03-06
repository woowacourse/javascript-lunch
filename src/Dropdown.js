import Component from "./Component.js";

class Dropdown extends Component {
  constructor($target, props) {
    super($target, props);
  }
  template() {
    return `
              <label for="category text-caption">카테고리</label>
    <select name="category" id="categoryOption" required>
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
    const categoryValue = this.props;
    const categoryHTML = categoryValue
      .map((data) => {
        return `<option value=${data}>${data}</option>`;
      })
      .join("");

    document.getElementById("categoryOption").innerHTML += categoryHTML;
  }
}

export default Dropdown;
