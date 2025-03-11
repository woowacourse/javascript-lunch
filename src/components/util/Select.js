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
  const $options = createOptions(options, selectedValue);
  
  $select.appendChild($options);
  return $select;
}

function createOptions(options, selectedValue) {
  const $fragment = document.createDocumentFragment();

  if(!selectedValue) {
    const $defaultOption = createElement({
      tag: "option",
      value: "",
    });
  
    $defaultOption.textContent = '선택해 주세요.';
    $fragment.appendChild($defaultOption);
  }

  options.forEach((option) => {
    const $option = createElement({ tag: "option", value: option });
    if(selectedValue && selectedValue === option) {
      $option.selected = true;
    }
    $option.textContent = option;
    $fragment.appendChild($option);
  });

  return $fragment;
}
