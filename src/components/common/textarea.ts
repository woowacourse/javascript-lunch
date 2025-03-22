import { TextareaField } from "../../types/formFieldsType";

const $textarea = ({ attribute }: TextareaField) => {
  const textarea = document.createElement("textarea");

  Object.assign(textarea, attribute);

  return textarea;
};

export default $textarea;
