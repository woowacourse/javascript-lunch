import createElement from "../../../utils/createElement/createElement";
import Input from "../Input";
import Select from "../Select";
import TextArea from "../TextArea";
import createFormElementByType from "./createFormElementByType";
import HelpText from "./HelpText";
import Label from "./Label";

const INPUT_HELP_TEXT = {
  DESCRIPTION: "메뉴 등 추가 정보를 입력해 주세요.",
  LINK: "매장 정보를 확인할 수 있는 링크를 입력해 주세요.",
};

const InputField = ({ inputType, infoType, required, options }) => {
  const formElement = createFormElementByType({
    inputType,
    infoType,
    required,
    options,
  });

  const inputField = createElement({
    tagName: "div",
    classNames: ["form-item", required ? "form-item--required" : ""],
    attributes: { id: `${infoType}-form-item` },
    children: [
      Label(infoType),
      formElement,
      INPUT_HELP_TEXT[infoType.toUpperCase()] &&
        HelpText(INPUT_HELP_TEXT[infoType.toUpperCase()]),
    ],
  });

  return inputField;
};

export default InputField;

const LABEL_TEXT = {
  category: "카테고리",
  name: "이름",
  distance: "거리(도보 이동 시간)",
  description: "설명",
  link: "참고 링크",
};
