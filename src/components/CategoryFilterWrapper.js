import SelectField from "./Form/SelectField.js";

function CategoryFilterWrapper(CATEGORY_FILTER_DATA) {
  const sectionElement = document.createElement("section");
  sectionElement.classList.add("restaurant-filter-container");

  CATEGORY_FILTER_DATA.forEach((data) => {
    sectionElement.appendChild(SelectField(data));
  });
  return sectionElement;
}

export default CategoryFilterWrapper;
