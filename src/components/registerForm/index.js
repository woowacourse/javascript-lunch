import { FOOD_CATEGORY } from "../../constants/foodCategory";
import { WALK_TIME_MINUTES } from "./walkTimeMinutes";
import RestaurantList from "../../domain/RestaurantList";
import createElement from "../../utils/createElement/createElement";
import createKeyValuePair from "../../utils/createKeyValuePair";
import Input from "../common/input";
import InputField from "../common/inputField";
import Select from "../common/select";
import TextArea from "../common/textArea";
import ButtonContainer from "./buttonContainer";

const INPUT_HELP_TEXT = {
  DESCRIPTION: "메뉴 등 추가 정보를 입력해 주세요.",
  LINK: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
};

const RegisterForm = (restaurantList) => {
  const registerForm = createElement({
    tagName: "form",
    attributes: { id: "register-form" },
  });

  registerForm.appendChild(
    InputField(
      Select(
        "category",
        true,
        createKeyValuePair(
          Object.keys(FOOD_CATEGORY),
          Object.keys(FOOD_CATEGORY)
        )
      )
    )
  );

  registerForm.appendChild(InputField(Input("name", true)));

  registerForm.appendChild(
    InputField(
      Select(
        "distance",
        true,
        createKeyValuePair(
          Object.values(WALK_TIME_MINUTES),
          Object.values(WALK_TIME_MINUTES).map((minute) => minute + "분 내")
        )
      )
    )
  );

  registerForm.appendChild(
    InputField(TextArea("description"), INPUT_HELP_TEXT.DESCRIPTION)
  );

  registerForm.appendChild(InputField(Input("link"), INPUT_HELP_TEXT.LINK));

  registerForm.appendChild(ButtonContainer(restaurantList));

  return registerForm;
};

export default RegisterForm;
