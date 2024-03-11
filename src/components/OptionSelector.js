import BaseComponent from "./BaseComponent.js";

class OptionSelector extends BaseComponent {
  render() {
    const optionsArray = this.getAttribute("options").split(",");

    this.innerHTML = `
      <select name="category" id="category-filter" class="restaurant-filter">
        ${optionsArray.map((option) => {
          return `<option value=${option}>${option}</option>`;
        })}
      </select> 
    `;
  }

  setEvent() {
    const selectType = this.getAttribute("type");

    this.addEventListener("change", (e) => {
      const selectedValue = e.target.value;

      this.emitEvent("select-change", {
        type: selectType,
        option: selectedValue,
      });
    });
  }
}

customElements.define("option-selector", OptionSelector);
