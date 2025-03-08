import { FOOD_CATEGORY } from "../../constants/foodCategory";
import { INPUT_HELP_TEXT } from "../../constants/inputHelpText";
import { WALK_TIME_MINUTES } from "../../constants/walkTimeMinutes";
import createKeyValuePair from "../../utils/createKeyValuePair";
import Input from "../common/input";
import InputField from "../common/inputField";
import Select from "../common/select";
import TextArea from "../common/textArea";
import Distance from "../restaurantCard/distance";
import ButtonContainer from "./buttonContainer";

const RegisterForm = () => {
  const registerForm = document.createElement("form");
  registerForm.setAttribute("id", "register-form");

  registerForm.appendChild(
    InputField(
      "category",
      Select({
        name: "category",
        required: true,
        options: createKeyValuePair(
          Object.keys(FOOD_CATEGORY),
          Object.keys(FOOD_CATEGORY)
        ),
      })
    )
  );
  registerForm.appendChild(
    InputField("name", Input({ name: "name", required: true }))
  );
  registerForm.appendChild(
    InputField(
      "distance",
      Select({
        name: "distance",
        required: true,
        options: createKeyValuePair(
          WALK_TIME_MINUTES,
          WALK_TIME_MINUTES.map((minute) => minute + "분 내")
        ),
      })
    )
  );
  registerForm.appendChild(
    InputField(
      "description",
      TextArea({ name: "description" }),
      INPUT_HELP_TEXT.DESCRIPTION
    )
  );
  registerForm.appendChild(
    InputField("link", Input({ name: "link" }), INPUT_HELP_TEXT.LINK)
  );

  registerForm.appendChild(ButtonContainer());

  return registerForm;
};

export default RegisterForm;
