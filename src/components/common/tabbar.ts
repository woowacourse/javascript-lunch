const $tabbar = () => {
  const tabContainer = document.createElement("div");
  tabContainer.classList.add("tab-container");

  const tab1 = document.createElement("input");
  tab1.setAttribute("type", "radio");
  tab1.name = "tab";
  tab1.id = "tab1";
  tab1.value = "all";
  tab1.classList.add("tab", "tab--1");
  tab1.checked = true;

  const tab1Label = document.createElement("label");
  tab1Label.classList.add("tab_label");
  tab1Label.setAttribute("for", "tab1");
  tab1Label.innerText = "모든 음식점";

  tabContainer.appendChild(tab1);
  tabContainer.appendChild(tab1Label);

  const tab2 = document.createElement("input");
  tab2.setAttribute("type", "radio");
  tab2.name = "tab";
  tab2.id = "tab2";
  tab2.value = "frequent";
  tab2.classList.add("tab", "tab--2");

  const tab2Label = document.createElement("label");
  tab2Label.classList.add("tab_label");
  tab2Label.setAttribute("for", "tab2");
  tab2Label.innerText = "자주 가는 음식점";

  tabContainer.appendChild(tab2);
  tabContainer.appendChild(tab2Label);

  const indicator = document.createElement("div");
  indicator.classList.add("indicator");
  tabContainer.appendChild(indicator);

  return tabContainer;
};

export default $tabbar;
