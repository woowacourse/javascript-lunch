import createElement from "../../util/createElement";

function createDefaultOption() {
  const defaultContext = '선택해 주세요.';

  const $defaultOption = createElement({
    tag: "option",
    value: "",
  });

  $defaultOption.textContent = defaultContext;

  return $defaultOption
}

function selectOption($option, option, selectedValue) {
  if(selectedValue && selectedValue === option) {
    $option.selected = true;
  }
  
}

export default function Options(options, selectedValue) {

    const $fragment = document.createDocumentFragment();
  
    if(!selectedValue) {
      const $defaultOption = createDefaultOption();
      $fragment.appendChild($defaultOption);
    }
  
    options.forEach((option) => {
      const $option = createElement({ tag: "option", value: option });
      selectOption($option, option, selectedValue);
      $option.textContent = option;
      $fragment.appendChild($option);
    });
  
    return $fragment;
  }