import CustomElement from "../../abstracts/CustomElement";

class SelectComponent extends CustomElement {
  data = {
    filterName: "",
    list: [{ value: "", name: "" }],
  };
  template() {
    return `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                select {
                    height: 44px;
                    min-width: 125px;
                
                    border: 1px solid #d0d5dd;
                    border-radius: 8px;
                    background: transparent;
                
                    font-size: 16px;
                }
                
                .restaurant-filter {
                    padding: 8px;
                }
            </style>
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
