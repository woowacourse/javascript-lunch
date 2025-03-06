import { FOOD_CATEGORY } from "../../constants/foodCategory";
import { WALK_TIME_MINUTES } from "../../constants/walkTimeMinutes";
import Input from "../common/input";
import InputField from "../common/inputField";
import Select from "../common/select";
import ButtonContainer from "./buttonContainer";

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

  registerForm.appendChild(ButtonContainer(restaurantList));

  return registerForm;
};

export default RegisterForm;
