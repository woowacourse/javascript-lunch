import createElement from "../../util/createElement.js";

export default function Select({
  name,
  id,
  classNames = [],
  options,
  values = [],
  isDefaultOption = true,
  isRequired = false,
}) {
  const $select = createElement({
    tag: "select",
    name,
    id,
    classNames,
    required: isRequired,
  });
  const $options = createOptions(options, values, isDefaultOption);

  $select.appendChild($options);
  return $select;
}

function createOptions(options, values, isDefaultOption) {
  const $fragment = document.createDocumentFragment();
  if (isDefaultOption) {
    const $defaultOption = createElement({
      tag: "option",
      value: "",
      textContent: "선택해 주세요.",
    });
    $fragment.appendChild($defaultOption);
  }

  options.forEach((option, index) => {
    const $option = createElement({
      tag: "option",
      value: values[index] || option,
      textContent: option,
    });
    $fragment.appendChild($option);
  });

  return $fragment;
}
