const FilterSelect = {
  create({ id, name, dropdownList }) {
    const filterElement = document.createElement("select");
    filterElement.id = id;
    filterElement.name = name;
    filterElement.classList.add("restaurant-filter");
    filterElement.innerHTML = /*html*/ `
    ${dropdownList
      .map(({ label, value }) => `<option value="${value}">${label}</option>`)
      .join("\n")}
    `;

    return filterElement;
  },
};

export default FilterSelect;
