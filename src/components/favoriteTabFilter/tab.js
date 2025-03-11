import { createElement } from "../../utils/createElement";

const Tab = ({ text, active = false }) => {
  console.log(active);
  const tab = createElement(/*html*/ `
    <div class="favorite-filter-tab ${active ? "active" : ""}">${text}</div>
  `);

  tab.addEventListener("click", (e) => {
    e.target.previousSibling?.classList.remove("active");
    e.target.nextSibling?.classList.remove("active");
    e.target.classList.add("active");
  });

  return tab;
};
export default Tab;
