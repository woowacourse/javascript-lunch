import type { Props, ReadOnlyOptionList } from "../../types/type";

interface FilterProps extends Props<"select"> {
  dropdownList: ReadOnlyOptionList;
}

function createFilter({ id, onchange, dropdownList }: FilterProps) {
  const select = createElement("select", {
    name: id,
    id,
    onchange,
    className: "restaurant-filter",
  });
  const optionElements = dropdownList.map(({ value, text }) =>
    createElement("option", {
      value,
      textContent: text,
    })
  );
  select.append(...optionElements);
  return select;
}

export default createFilter;
