import createElement from "../../utils/createElement/createElement";
import Title from "../common/Title";
import RegisterForm from "../RegisterForm";
import registerIcon from "./RegisterIcon";

const header = () =>
  createElement({
    tagName: "header",
    classNames: ["gnb"],
    children: [
      Title("점심 뭐 먹지", "h1", "gnb__title", "text-title"),
      registerIcon(),
    ],
  });

export default header;
