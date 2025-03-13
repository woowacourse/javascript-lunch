import TabWrapper from "../components/TabWrapper.js";

const TAB_DATA = [
  { id: "all-restaurant", text: "모든 음식점" },
  { id: "often-go-restaurant", text: "자주 가는 음식점" },
];
function TabController(mainElement, { allListContainerElement, oftenGoListContainerElement }) {
  const tabContainerElement = TabWrapper(TAB_DATA);
  mainElement.prepend(tabContainerElement);

  const allRestaurantTab = tabContainerElement.querySelector("#all-restaurant");
  const oftenGoRestaurantTab = tabContainerElement.querySelector("#often-go-restaurant");

  allRestaurantTab.classList.add("active");

  allRestaurantTab.addEventListener("click", () => {
    oftenGoRestaurantTab.classList.remove("active");
    allRestaurantTab.classList.add("active");
    oftenGoListContainerElement.classList.remove("active");
    allListContainerElement.classList.add("active");
  });

  oftenGoRestaurantTab.addEventListener("click", () => {
    allRestaurantTab.classList.remove("active");
    oftenGoRestaurantTab.classList.add("active");
    allListContainerElement.classList.remove("active");
    oftenGoListContainerElement.classList.add("active");
  });
}

export default TabController;
