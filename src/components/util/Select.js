import Options from "./Options.js";
import createElement from "../../util/createElement.js";

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
  
  $select.appendChild($options);
  return $select;
}
