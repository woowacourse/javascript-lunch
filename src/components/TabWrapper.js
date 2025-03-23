import Tab from "./Tab.js";

function TabWrapper(TAB_DATA) {
  const sectionElement = document.createElement("section");
  sectionElement.classList.add("restaurant-tab-container");

  TAB_DATA.forEach(({ id, text }) => {
    sectionElement.appendChild(Tab(id, text));
  });
  return sectionElement;
}

export default TabWrapper;
