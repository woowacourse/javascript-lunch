import Header from "./components/header/Header.js";
import RestaurantListItem from "./components/restaurantListItem/RestaurantListItem.js";
import RestaurantList from "./components/restaurantList/RestaurantList.js";
import SelectBox from "./components/selectBox/SelectBox.js";
import ButtonSheet from "./components/bottomSheet/BottomSheet.js";

const $body = document.querySelector("body");
$body.appendChild(Header());
const $main = document.createElement("main");

$body.appendChild($main);
const $listSection = document.createElement("section");
$listSection.className = "restaurant-list-container";

$main.appendChild($listSection);
$listSection.appendChild(RestaurantList());

$main.appendChild(ButtonSheet({ title: "새로운 음식점" }));
