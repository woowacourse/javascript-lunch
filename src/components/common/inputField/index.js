import createElement from "../../../utils/createElement/createElement";

const InputField = (inputElement, text) => {
  const infoType = inputElement.id;
  const required = inputElement.required;
  //TODO: className 리스트 전달하는 방법 고민
  const inputFieldClassNames = ["form-item"];

  if (required) inputFieldClassNames.push("form-item--required");

  const inputField = createElement({
    tagName: "div",
    classNames: inputFieldClassNames,
    attributes: { id: `${infoType}-form-item` },
  });

  const label = createElement({
    tagName: "label",
    attributes: { for: infoType },
    classNames: ["text-caption"],
    text: LABEL_TEXT[infoType],
  });

  const helpText = createElement({
    tagName: "span",
    classNames: ["help-text", "text-caption"],
    text,
  });

  inputField.appendChild(label);
  inputField.appendChild(inputElement);

  if (text) inputField.appendChild(helpText);

  return inputField;
};

export default InputField;

const LABEL_TEXT = {
  category: "카테고리",
  name: "이름",
  distance: "거리(도보 이동 시간)",
  description: "설명",
  link: "참고 링크",
};
