import createElementByTag from "../../utils/createElementByTag";

interface tabProps {
  tabMenu: Record<string, HTMLElement[]>;
  contentsArea: HTMLElement;
}

export const TAB_ID_PREFIX = "tab-";

const generateTab = ({ tabMenu, contentsArea }: tabProps) => {
  const tabTitles = Object.keys(tabMenu);
  const tabContainer = createElementByTag({
    tag: "div",
    attribute: { value: tabTitles[0], id: "tab" },
  });

  const tabs = tabTitles.map((menu) =>
    createElementByTag({
      tag: "button",
      classes: ["tab"],
      contents: menu,
      attribute: { id: `${TAB_ID_PREFIX}${menu}` },
    })
  );

  tabContainer.append(...tabs);

  contentsArea.append(...tabMenu[tabTitles[0]]);

  tabContainer.addEventListener("click", (e) => {
    if (e.target instanceof HTMLElement) {
      const key = e.target.id.slice(TAB_ID_PREFIX.length);
      contentsArea.replaceChildren(...tabMenu[key]);

      tabContainer.setAttribute("value", key);
    }
  });

  return tabContainer;
};

export default generateTab;
