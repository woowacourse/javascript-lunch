import toElement from "../utils/toElement.js";

type TabButtonType = "totalTab" | "favoriteTab";

function TabButton(tabType: TabButtonType) {
  const text = tabType === "totalTab" ? "모든 음식점" : "자주 가는 음식점";

  const $el = toElement(`
    <div id="button_${text}" class="tab--button ${tabType}">
      ${text}
    </div>
  `);

  return $el;
}

export default TabButton;
