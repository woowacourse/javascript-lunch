import { SelectFilterType } from "../../types/component/SelectFilter";

export function SelectFilter({ name, id, options }: SelectFilterType) {
  const select = document.createElement("select");
  select.name = name;
  select.id = id;
  select.className = "restaurant-filter";

  select.innerHTML = options
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("");

  return select;
}
