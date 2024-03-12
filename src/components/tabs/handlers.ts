import filterState from "../../store/FilterStateStore";

const removeCurrentClassName = () => {
  const allTab = document.getElementsByClassName("tab-item");
  const tabsArray = Array.from(allTab);
  tabsArray.forEach((element) => {
    element.classList.remove("current");
  });
};

const changeFavFilter = (clickedTab: HTMLElement) => {
  if (clickedTab.getAttribute("data-tab") === "fav")
    return filterState.setFavType(true);
  return filterState.setFavType(false);
};

const tabClicked = (tabs: HTMLElement) => {
  tabs.addEventListener("click", (event) => {
    removeCurrentClassName();
    if (event.target instanceof HTMLElement) {
      const clickedTab = event.target.closest(".tab-item") as HTMLElement;
      clickedTab.classList.add("current");
      changeFavFilter(clickedTab);
    }
  });
};

const clickTabHandler = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelector(".tabs") as HTMLElement;

    tabClicked(tabs);
  });
};
export default clickTabHandler;
