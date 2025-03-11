import createElement from "../../../utils/createElement/createElement";

const SELECT_PLACEHOLDER = "선택해주세요.";

const Select = (name, required, options) => {
  const defaultOption = createElement({
    tagName: "option",
    attributes: { value: "" },
    text: SELECT_PLACEHOLDER,
  });

  const optionsElement = Object.entries(options).map(([key, value]) =>
    createElement({
      tagName: "option",
      attributes: { value: key },
      text: value,
    })
  );

  const select = createElement({
    tagName: "select",
    attributes: { name, id: name, required },
    children: [defaultOption, ...optionsElement],
  });

  return select;
};

export default Select;
