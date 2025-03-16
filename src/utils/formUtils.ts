import { FormField, ModalFormConfig } from "../../types/form.ts";
import Button from "../components/Button.js";
import ButtonsForm from "../components/Form/ButtonsForm.js";
import FormItem from "../components/Form/FormItem.js";
import InputField from "../components/Form/InputField.js";
import SelectField from "../components/Form/SelectField.js";
import TextareaField from "../components/Form/TextareaField.js";

export function generateFormItems(MODAL_FORM_CONFIG: ModalFormConfig) {
  const { fields, buttons } = MODAL_FORM_CONFIG;

  const formItems = fields.map(({ notice, ...fieldData }) => {
    const fieldComponent = matchFieldComponent(fieldData);
    return FormItem({ ...fieldData, fieldComponent, notice });
  });

  const formButtons = buttons.map((buttonData) => Button(buttonData));

  return { formItems, buttonsFormItems: ButtonsForm(formButtons) };
}

function matchFieldComponent({ type, name, inputType, options, defaultOption, required }: FormField) {
  switch (type) {
    case "select":
      return SelectField({ name, options, defaultOption, required });
    case "input":
      return InputField({ inputType, name, required });
    case "textarea":
      return TextareaField(name);
    default:
      console.error(`지원하지 않는 필드 타입입니다: "${type}"`);
  }
}
