import selectedFilterValue from "../../domain/SelectedFilterValue";
import createElement from "../../util/createElement";
import Restaurant from "./Restaurant";

export default function RestaurantFilterTabs() {    
    const $restaurantFilterContainer = createElement({
        tag: "div",
        classNames: ["restaurant-filter-tabs"],
    });
    
    const $allTab = createElement({
        tag: "button",
        classNames: ["restaurant-tab", "all-tab"],
    });

    const $wishTab = createElement({
        tag: "button",
        classNames: ["restaurant-tab", "wish-tab"],
    });

    $allTab.textContent = "모든 음식점";
    $wishTab.textContent = "자주 가는 음식점";

    $restaurantFilterContainer.appendChild($allTab);
    $restaurantFilterContainer.appendChild($wishTab);

    function wishListClassToggle() {
        if(selectedFilterValue.getIsWishList()) {
            $wishTab.classList.add("active");
            $allTab.classList.remove("active");
        } else {
            $allTab.classList.add("active");
            $wishTab.classList.remove("active");
        }
    }

    wishListClassToggle();


    $allTab.addEventListener("click", () => {
        selectedFilterValue.updateSelectedFilterValue("restaurant-tab", false);
        wishListClassToggle();
        Restaurant({isReRender: true});
    });

    $wishTab.addEventListener("click", () => {
        selectedFilterValue.updateSelectedFilterValue("restaurant-tab", true);
        wishListClassToggle();
        Restaurant({isReRender: true});
    });

    return $restaurantFilterContainer;
}
