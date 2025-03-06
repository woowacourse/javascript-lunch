import Restaurant from "./model/Restaurant";
import { $ } from "./utils/dom";
import { getInfo } from "./view/input";
import { FOOD_CATEGORY } from "./constants/foodCategory";
import { WALK_TIME_MINUTES } from "./constants/walkTimeMinutes";
import header from "./components/header";
import restaurantCard from "./components/restaurantCard";
import { mockRestaurants } from "./mockRestaurant";
import InputField from "./common/inputField";
import Select from "./common/select";
import Input from "./common/input";
import Button from "./common/button";

const restaurantList = [...mockRestaurants];

const renderRestaurants = (restaurantList) => {
  const ulTag = $(".restaurant-list");
  restaurantList.forEach((restaurant) => {
    ulTag.appendChild(restaurantCard(restaurant));
  });
};

addEventListener("load", () => {
  $("#app").prepend(header());
  renderRestaurants(restaurantList);
  $("#register-form").appendChild(
    InputField("category", Select("category", true, Object.keys(FOOD_CATEGORY)))
  );
  $("#register-form").appendChild(InputField("name", Input("name", true)));
  $("#register-form").appendChild(
    InputField(
      "category",
      Select("distance", true, Object.keys(WALK_TIME_MINUTES))
    )
  );
  $("#register-form").appendChild(
    InputField("description", Input("description"))
  );
  $("#register-form").appendChild(InputField("link", Input("link")));

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  $("#register-form").appendChild(buttonContainer);
  buttonContainer.appendChild(
    Button({
      text: "취소하기",
      style: "button--secondary",
      onClick: () => {},
      type: "button",
      id: "cancel-button",
    })
  );
  buttonContainer.appendChild(
    Button({
      text: "추가하기",
      style: "button--primary",
      onClick: (e) => {
        e.preventDefault();
        const restaurant = new Restaurant(getInfo());
        restaurantList.push(restaurant);

        $(".modal-backdrop").classList.remove("open");
        renderRestaurants(restaurantList);
      },
      id: "register-button",
    })
  );
});
{
  /* <div class="button-container"> */
}
