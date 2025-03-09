import createElement from "../../util/createElement.js";

export default function Select({
  name,
  id,
  classNames = [],
  options,
  isRequired = false,
}) {
  const $select = createElement({
    tag: "select",
    name,
    id,
    classNames,
    required: isRequired,
  });
  const $options = createOptions(options);

  $select.appendChild($options);
  return $select;
}

function createOptions(options) {
  const $fragment = document.createDocumentFragment();
  const $defaultOption = createElement({
    tag: "option",
    value: "",
  });
  $defaultOption.textContent = "선택해 주세요.";
  $fragment.appendChild($defaultOption);

  options.forEach((option) => {
    const $option = createElement({ tag: "option", value: option });
    $option.textContent = option;
    $fragment.appendChild($option);
  });

  return $fragment;
}
