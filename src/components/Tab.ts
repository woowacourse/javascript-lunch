type TabProps = {
  title: string;
  subTitle: string;
};

const createTab = ({ title, subTitle }: TabProps) => {
  const tabContainer = document.createElement("div");
  tabContainer.classList.add("tab");

  const mainTitle = document.createElement("h2");
  mainTitle.textContent = title;
  mainTitle.classList.add("tab__title");

  const subTitleEl = document.createElement("h2");
  subTitleEl.textContent = subTitle;
  subTitleEl.classList.add("tab__subTitle");

  tabContainer.append(mainTitle, subTitleEl);

  return tabContainer;
};

export default createTab;
