import { partial } from "@zoeykr/function-al";
import { TAB, TabKey } from "../../entities";

const renderTabButton = (
  currentTab: TabKey,
  key: TabKey,
  label: string,
  testId: string
) =>
  `<button class="${currentTab === key ? "active" : ""}"
      data-tab="${key}" data-action="set-tab" data-testid="${testId}">
      ${label}
    </button>`;

const renderTabBar = (currentTab: TabKey) => {
  const renderTabButtonFor = partial(renderTabButton, currentTab);

  return `
      <div id="tabBar">
        ${renderTabButtonFor("ALL", TAB.ALL, "all-tab")}
        ${renderTabButtonFor("FAVORITE", TAB.FAVORITE, "favorite-tab")}
      </div>`;
};

export default renderTabBar;
