import { FOOD_CATEGORY } from "../../constants/foodCategory";
import { INPUT_HELP_TEXT } from "../../constants/inputHelpText";
import { WALK_TIME_MINUTES } from "../../constants/walkTimeMinutes";
import { $ } from "../../utils/dom";
import ErrorMessage from "../common/errorMessage";
import Input from "../common/input";
import InputField from "../common/inputField";
import Select from "../common/select";
import TextArea from "../common/textArea";
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
        options: Object.keys(FOOD_CATEGORY).map((key) => ({
          label: FOOD_CATEGORY[key],
          value: key,
        })),
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
        options: WALK_TIME_MINUTES.map((key) => ({
          label: `${key}분 내`,
          value: `${key}`,
        })),
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

  registerForm.appendChild(ButtonContainer(onSubmitFailed));

  return registerForm;
};

const onSubmitFailed = (e) => {
  const currentInputField = $(`#${e.cause}-form-item`);
  currentInputField.appendChild(ErrorMessage(e.message));
};

export default RegisterForm;
