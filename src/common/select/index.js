const Select = (name, required, options) => {
  const select = document.createElement("select");
  select.setAttribute("name", name);
  select.setAttribute("id", name);
  select.setAttribute("required", required);

  const defaultOption = document.createElement("option");
  defaultOption.setAttribute("value", "");
  defaultOption.textContent = "선택해 주세요";
  select.appendChild(defaultOption);

  options.forEach((option) => {
    const optionTag = document.createElement("option");
    optionTag.setAttribute("value", option);
    optionTag.textContent = option;
    select.appendChild(optionTag);
  });

  return select;
};

export default Select;
