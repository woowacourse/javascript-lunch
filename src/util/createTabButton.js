import createElement from "./createElement";

export default function createTabButton({className, text, isWishTab}) {
    const $tab = createElement({
        tag: "button",
        classNames: ["restaurant-tab", className],
    });
    $tab.textContent = text;
    $tab.dataset.wish = isWishTab;
    return $tab;
}

