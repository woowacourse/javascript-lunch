import type { Props, ReadOnlyOptionList } from "../../types/type";

interface DropdownBoxProps extends Props<"select"> {
  labelText: string;
  dropdownList: ReadOnlyOptionList;
}

export default function createDropdownBox({
  labelText,
  dropdownList,
  id,
  required = false,
}: DropdownBoxProps) {
  const dropdownBox = createElement("div", {
    className: required ? ["form-item", "form-item--required"] : "form-item",
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

  const optionElements = dropdownList.map(({ value, text }) =>
    createElement("option", {
      value,
      textContent: text,
    })
  );

  select.append(...optionElements);
  dropdownBox.append(dropdownLabel, select);

  return dropdownBox;
}
