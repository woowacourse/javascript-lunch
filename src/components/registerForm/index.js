import { BUTTON_TEXT } from "../../constants/buttonText";
import { FOOD_CATEGORY } from "../../constants/foodCategory";
import { WALK_TIME_MINUTES } from "../../constants/walkTimeMinutes";
import renderRestaurants from "../../domain/renderRestaurant";
import Restaurant from "../../model/Restaurant";
import { $ } from "../../utils/dom";
import { getInfo } from "../../view/input";
import Button from "../common/button";
import Input from "../common/input";
import InputField from "../common/inputField";
import Select from "../common/select";

const RegisterForm = (restaurantList) => {
  const registerForm = document.createElement("form");
  registerForm.setAttribute("id", "register-form");

  registerForm.appendChild(
    InputField("category", Select("category", true, Object.keys(FOOD_CATEGORY)))
  );
  registerForm.appendChild(InputField("name", Input("name", true)));
  registerForm.appendChild(
    InputField(
      "category",
      Select("distance", true, Object.keys(WALK_TIME_MINUTES))
    )
  );
  registerForm.appendChild(InputField("description", Input("description")));
  registerForm.appendChild(InputField("link", Input("link")));

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  registerForm.appendChild(buttonContainer);
  buttonContainer.appendChild(
    Button({
      text: BUTTON_TEXT.CANCEL,
      style: "button--secondary",
      onClick: () => $(".modal-backdrop").classList.remove("open"),
      type: "button",
      id: "cancel-button",
    })
  );
  buttonContainer.appendChild(
    Button({
      text: BUTTON_TEXT.ADD,
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

  return registerForm;
};

export default RegisterForm;
