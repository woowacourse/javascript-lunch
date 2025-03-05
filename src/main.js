import Header from "./components/header/Header.js";
import RestaurantListItem from "./components/restaurantListItem/RestaurantListItem.js";
import RestaurantList from "./components/restaurantList/RestaurantList.js";
import SelectBox from "./components/common/selectBox/SelectBox.js";
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
