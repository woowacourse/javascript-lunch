import { partial } from "@zoeykr/function-al";
import { CategoryType, SortByType } from "../../entities";

type SelectedKey = (CategoryType | "ALL") | SortByType;
type OptionEntry = [string, string];

interface RenderSelectProps {
  name: string;
  id: string;
  action: string;
  testId: string;
  entries: OptionEntry[];
  selectedKey: SelectedKey;
}

const renderOption = (selectedKey: SelectedKey, [key, label]: OptionEntry) =>
  `<option value="${key}" ${
    key === selectedKey ? "selected" : ""
  }>${label}</option>`;

const renderOptions = (entries: OptionEntry[], selectedKey: SelectedKey) =>
  entries.map(partial(renderOption, selectedKey)).join("");

const renderSelect = ({
  name,
  id,
  action,
  testId,
  entries,
  selectedKey,
}: RenderSelectProps) => /*html*/ `
    <select name="${name}" id="${id}" class="restaurant-filter"
      data-action="${action}" data-testid="${testId}">
      ${renderOptions(entries, selectedKey)}
    </select>
  `;

export default renderSelect;
