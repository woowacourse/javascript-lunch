import createElement from "../../util/createElement";

export default function TabButton({className, text, isWishTab}) {
    const $tab = createElement({
        tag: "button",
        classNames: ["restaurant-tab", className],
    });
    $tab.textContent = text;
    $tab.dataset.wish = isWishTab;
    
    return $tab;
}

