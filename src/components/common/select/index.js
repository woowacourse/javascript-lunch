import createElement from "../../../utils/createElement/createElement";

const SELECT_PLACEHOLDER = "선택해주세요.";

const Select = (name, required, options) => {
  const select = createElement({
    tagName: "select",
    attributes: { name, id: name, required },
  });

  const defaultOption = createElement({
    tagName: "option",
    attributes: { value: "" },
    text: SELECT_PLACEHOLDER,
  });

  select.appendChild(defaultOption);

  for (const [key, value] of Object.entries(options)) {
    const optionTag = createElement({
      tagName: "option",
      attributes: { value: key },
      text: value,
    });

    select.appendChild(optionTag);
  }

  return select;
};

export default Select;
