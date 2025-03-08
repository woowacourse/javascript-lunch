const defaultOption = { value: "", text: "선택해 주세요" };

export default function createDropdownBox({
  labelText,
  id,
  dropdownList,
  required = false,
}) {
  const dropdownBox = createElement("div", {
    className: ["form-item", `${required && "form-item--required"}`],
  });
  const dropdownLabel = createElement("label", {
    htmlFor: id,
    className: "text-caption",
    textContent: labelText,
  });
  const select = createElement("select", {
    name: id,
    id,
    required,
  });

  const optionList = [defaultOption, ...dropdownList];
  const optionElements = optionList.map(({ value, text }) =>
    createElement("option", {
      value,
      textContent: text,
    })
  );

  select.append(...optionElements);
  const fragment = createElementsFragment([dropdownLabel, select]);
  dropdownBox.appendChild(fragment);

  return dropdownBox;
}
