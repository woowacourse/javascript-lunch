import selectedFilterValue from "../../domain/SelectedFilterValue";
import createElement from "../../util/createElement";
import TabButton from "../util/TabButton";
import Restaurant from "./Restaurant";

const TAB_TITLE_ALL = "모든 음식점"
const TAB_TITLE_WISH = "자주 가는 음식점"

export default function RestaurantFilterTabs() {    
    const $restaurantFilterContainer = createElement({
        tag: "div",
        classNames: ["restaurant-filter-tabs"],
    });
    
    const $allTab = TabButton({
        className: "all-tab",
        text: TAB_TITLE_ALL,
        isWishTab: false,
    });

    const $wishTab = TabButton({
        className: "wish-tab",
        text: TAB_TITLE_WISH,
        isWishTab: true,
    });

    $restaurantFilterContainer.appendChild($allTab);
    $restaurantFilterContainer.appendChild($wishTab);

    updateActiveTab();

    function updateActiveTab() {
        const isWishList = selectedFilterValue.getIsWishList();
        [$allTab, $wishTab].forEach($tab => 
            $tab.classList.toggle("active", $tab.dataset.wish === String(isWishList))
        );
    }
    
    function changeTab(event) {
        const isWish = event.target.dataset.wish === "true";
        selectedFilterValue.updateSelectedFilterValue("restaurant-tab", isWish);
        updateActiveTab();
        Restaurant({ isReRender: true });
    }

    [$allTab, $wishTab].forEach($tab => 
        $tab.addEventListener("click", (event) => {
        changeTab(event);
    }));

    $wishTab.addEventListener("click", (event) => {
        changeTab(event);
    });

    return $restaurantFilterContainer;
}