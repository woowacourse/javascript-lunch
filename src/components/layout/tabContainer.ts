import $createRestaurantList from "../restaurant/restaurantItemList";

const activeTabEvent = (id: string) => {
  const currentActiveTab = document.querySelector(".select-tab-active");
  currentActiveTab?.classList.remove("select-tab-active");
  const currentClickTab = document.getElementById(id);
  currentClickTab?.classList.add("select-tab-active");
};

const toggleTabClick = (e: MouseEvent) => {
  const target = e.target;
  if (!(target instanceof HTMLElement)) return;

  activeTabEvent(target.id);
  $createRestaurantList();
};

const $tabContainer = (tabs: HTMLButtonElement[]) => {
  const container = document.createElement("nav");
  container.classList.add("tab-container");
  container.addEventListener("click", toggleTabClick);

  tabs.forEach((tab) => {
    container.appendChild(tab);
  });

  return container;
};

export default $tabContainer;
