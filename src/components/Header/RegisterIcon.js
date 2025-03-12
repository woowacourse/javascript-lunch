import createElement from "../../utils/createElement/createElement";
import { $ } from "../../utils/dom";
import Image from "../common/Image";

const RegisterIcon = () =>
  createElement({
    tagName: "button",
    classNames: ["gnb__button"],
    events: {
      click: () => {
        $(".modal-backdrop").classList.add("open");
      },
    },
    children: [Image("./add-button.png", "음식점 추가")],
  });

export default RegisterIcon;
