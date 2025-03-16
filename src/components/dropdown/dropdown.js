import { RESTAURANT_DISTANCE_VALUES } from "../../settings/restaurant";
function appendStringForValue(array, string) {
  return array.map((ele) => ({ key: ele, value: ele + string }));
}

export default function createDropdownBox({
  labelText,
  id,
  dropdownList,
  required = false,
}) {
  const dropdownBox = createElement("div", {
    className: ["form-item", required && "form-item--required"],
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
  let stringToAppend = "";
  if (dropdownList === RESTAURANT_DISTANCE_VALUES) {
    stringToAppend = "분 내";
  }

  const mappedList = appendStringForValue(dropdownList, stringToAppend);
  const optionElements = [
    createElement("option", {
      value: "",
      textContent: "선택해 주세요",
    }),
    ...mappedList.map(({ key, value }) =>
      createElement("option", {
        value: key,
        textContent: value,
      })
    ),
  ];

  select.append(...optionElements);
  const fragment = createElementsFragment([dropdownLabel, select]);
  dropdownBox.appendChild(fragment);

  return dropdownBox;
}
