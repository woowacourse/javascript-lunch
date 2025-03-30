import { createElement } from "../utils/dom.ts";

type TabProps = {
  title: string;
  subTitle: string;
};

const createTab = ({ title, subTitle }: TabProps) => {
  const $tabContainer = createElement("div", {
    class: ["tab"],
  });

  const $mainTitle = createElement("h2", {
    class: ["tab__title"],
    textContent: title,
  });

  const $subTitleEl = createElement("h2", {
    class: ["tab__subTitle"],
    textContent: subTitle,
  });

  $tabContainer.append($mainTitle, $subTitleEl);

  return $tabContainer;
};

export default createTab;
