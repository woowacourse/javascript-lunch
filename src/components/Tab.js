function Tab(id, text) {
  const tabElement = document.createElement("div");
  tabElement.classList.add("restaurant-tab");
  tabElement.id = id;
  tabElement.textContent = text;

  return tabElement;
}
export default Tab;
