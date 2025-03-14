import TabWrapper from "../components/TabWrapper.js";

const TAB_DATA = [
  { id: "all-restaurant", text: "모든 음식점" },
  { id: "favorite-restaurant", text: "자주 가는 음식점" },
];
function TabController(
  mainElement,
  { allListContainerElement, favoriteListContainerElement },
  { updateList, updateFavoriteList },
) {
  const tabContainerElement = TabWrapper(TAB_DATA);
  mainElement.prepend(tabContainerElement);

  const allRestaurantTab = tabContainerElement.querySelector("#all-restaurant");
  const favoriteRestaurantTab = tabContainerElement.querySelector("#favorite-restaurant");

  allRestaurantTab.classList.add("active");

  allRestaurantTab.addEventListener("click", () => {
    favoriteRestaurantTab.classList.remove("active");
    allRestaurantTab.classList.add("active");
    favoriteListContainerElement.classList.remove("active");
    allListContainerElement.classList.add("active");
    updateList();
  });

  favoriteRestaurantTab.addEventListener("click", () => {
    allRestaurantTab.classList.remove("active");
    favoriteRestaurantTab.classList.add("active");
    allListContainerElement.classList.remove("active");
    favoriteListContainerElement.classList.add("active");
    updateFavoriteList();
  });
}

export default TabController;
