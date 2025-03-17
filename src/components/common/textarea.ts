import { TypeTextarea } from "../../types/types";

const $textarea = ({ attribute }: TypeTextarea) => {
  const textarea = document.createElement("textarea");

  Object.assign(textarea, attribute);

  return textarea;
};

export default $textarea;
