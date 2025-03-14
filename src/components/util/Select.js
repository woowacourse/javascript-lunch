import Options from "./Options.js";
import createElement from "../../util/createElement.js";
import selectedFilterValue from "../../domain/SelectedFilterValue.js";
import Restaurant from "../restaurant/Restaurant.js";

export default function Select({
  name,
  id,
  classNames = [],
  options,
  isRequired = false,
  selectedValue = '',
}) {
  const $select = createElement({
    tag: "select",
    name,
    id,
    classNames,
    required: isRequired,
    selectedValue,
  });
  
  const $options = Options(options, selectedValue);
  
  $select.addEventListener("change", function() {
    selectedFilterValue.updateSelectedFilterValue(id, this.value) 
    if(id === 'category-filter' || id === 'sorting-filter') {
      Restaurant({isReRender: true});
    }
  });

  $select.appendChild($options);
  return $select;
}
