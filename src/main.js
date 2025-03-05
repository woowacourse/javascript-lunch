import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurantListSection/restaurantList/RestaurantList.js";
import BottomSheetBase from "./components/bottomSheet/bottomSheetBase/BottomSheetBase.js";
import RestaurantForm from "./components/bottomSheet/restaurantForm/RestaurantForm.js";

const $body = document.querySelector("body");
$body.appendChild(Header());
const $main = document.createElement("main");

$body.appendChild($main);
const $listSection = document.createElement("section");
$listSection.className = "restaurant-list-container";

$main.appendChild($listSection);
$listSection.appendChild(RestaurantList());

$main.appendChild(
  BottomSheetBase({ title: "새로운 음식점", $children: RestaurantForm() })
);
