import { FOOD_CATEGORY } from "../../constants/foodCategory";
import { INPUT_HELP_TEXT } from "../../constants/inputHelpText";
import { WALK_TIME_MINUTES } from "../../constants/walkTimeMinutes";
import Input from "../common/input";
import InputField from "../common/inputField";
import Select from "../common/select";
import TextArea from "../common/textArea";
import ButtonContainer from "./buttonContainer";

const RegisterForm = (restaurantList) => {
  const registerForm = document.createElement("form");
  registerForm.setAttribute("id", "register-form");

  registerForm.appendChild(
    InputField(Select("category", true, Object.keys(FOOD_CATEGORY)))
  );
  registerForm.appendChild(InputField(Input("name", true)));
  registerForm.appendChild(
    InputField(Select("distance", true, WALK_TIME_MINUTES))
  );
  registerForm.appendChild(
    InputField(TextArea("description"), INPUT_HELP_TEXT.DESCRIPTION)
  );
  registerForm.appendChild(InputField(Input("link"), INPUT_HELP_TEXT.LINK));

  registerForm.appendChild(ButtonContainer(restaurantList));

  return registerForm;
};

export default RegisterForm;
