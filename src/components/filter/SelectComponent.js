import CustomElement from "../../abstracts/CustomElement";

class SelectComponent extends CustomElement {
  data = {
    filterName: "",
    list: [{ value: "", name: "" }],
  };
  template() {
    return `
            <select name="${this.data.filterName}" id="${
      this.data.filterName
    }-filter" class="restaurant-filter">
                ${this.data.list.map((option) => {
                  return `<option value="${option.value}">${option.name}</option>`;
                })}
            </select>
        `;
  }
}

export default SelectComponent;
