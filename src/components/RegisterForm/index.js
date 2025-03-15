import { FOOD_CATEGORY } from "../../constants/foodCategory";
import { WALK_TIME_MINUTES } from "./walkTimeMinutes";
import RestaurantList from "../../domain/RestaurantList";
import createElement from "../../utils/createElement/createElement";
import createKeyValuePair from "../../utils/createKeyValuePair";
import Input from "../common/Input";
import InputField from "../common/InputField";
import Select from "../common/Select";
import TextArea from "../common/TextArea";
import RegisterButtonContainer from "./RegisterButtonContainer";

const RegisterForm = (restaurantList) => {
  const foodCategoryField = InputField({
    inputType: "select",
    infoType: "category",
    required: true,
    options: createKeyValuePair(
      Object.keys(FOOD_CATEGORY),
      Object.keys(FOOD_CATEGORY)
    ),
  });

  const distanceField = InputField({
    inputType: "select",
    infoType: "distance",
    required: true,
    options: createKeyValuePair(
      Object.values(WALK_TIME_MINUTES),
      Object.values(WALK_TIME_MINUTES).map((minute) => minute + "분 내")
    ),
  });

  const registerForm = createElement({
    tagName: "form",
    attributes: { id: "register-form" },
    children: [
      foodCategoryField,
      InputField({ inputType: "input", infoType: "name", required: true }),
      distanceField,
      InputField({
        inputType: "textarea",
        infoType: "description",
      }),
      InputField({
        inputType: "input",
        infoType: "link",
      }),
      RegisterButtonContainer(restaurantList),
    ],
  });

  return registerForm;
};

export default RegisterForm;
