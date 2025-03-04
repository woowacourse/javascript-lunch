import Header from "./components/header/Header.js";
import RestaurantListItem from "./components/restaurantListItem/RestaurantListItem.js";
import RestaurantList from "./components/restaurantList/RestaurantList.js";
import SelectBox from "./components/selectBox/SelectBox.js";
import ButtonSheet from "./components/bottomSheet/BottomSheet.js";

const data = [
  {
    category: "한식",
    name: "피양콩할머니",
    distance: "10",
    description: "가게 설명~~~~~~",
  },
  {
    category: "중식",
    name: "가게2",
    distance: "5",
    description: "가게 설명22222~~~~~~",
  },
  {
    category: "일식",
    name: "가게3",
    distance: "15",
    description: "가게 설명3333~~~~~~",
  },
];

const $body = document.querySelector("body");
$body.appendChild(Header());
const $main = document.createElement("main");

$body.appendChild($main);
const $listSection = document.createElement("section");
$listSection.className = "restaurant-list-container";

$main.appendChild($listSection);
$listSection.appendChild(RestaurantList(data));

$main.appendChild(ButtonSheet({ title: "새로운 음식점" }));
