import Header from "./components/header/Header.js";
import RestaurantList from "./components/restaurantListSection/restaurantList/RestaurantList.js";
import BottomSheetBase from "./components/common/bottomSheetBase/BottomSheetBase.js";
import RestaurantForm from "./components/restaurantFormSection/restaurantForm/RestaurantForm.js";

export default function App() {
  const $body = document.querySelector("body");
  $body.appendChild(Header());

  const $main = document.createElement("main");
  $body.appendChild($main);

  $main.appendChild(RestaurantList());
  $main.appendChild(
    BottomSheetBase({ title: "새로운 음식점", $children: RestaurantForm() })
  );
}

App();
