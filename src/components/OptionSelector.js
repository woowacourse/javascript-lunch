import BaseComponent from "./BaseComponent.js";

class OptionSelector extends BaseComponent {
  #selectType = null;

  constructor() {
    super();
    this.#selectType = this.getAttribute("type");
  }

  #createOptionHTML(options) {
    return options.reduce(
      (accOptions, currOption) =>
        accOptions + `<option value=${currOption}>${currOption}</option>;`,
      ""
    );
  }

  render() {
    const options = this.getAttribute("options").split(",");

    this.innerHTML = `
      <select name="category" id="category-filter" class="restaurant-filter-select select-arrow-down arrow-down-black" aria-label="${
        this.#selectType
      }-select">
        ${this.#createOptionHTML(options)}
      </select> 
    `;
  }

  setEvent() {
    this.addEventListener("change", (e) => {
      const selectedValue = e.target.value;

      this.emitEvent("select-change", {
        type: this.#selectType,
        option: selectedValue,
      });
    });
  }
}

customElements.define("option-selector", OptionSelector);
