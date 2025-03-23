import createElement from "../../utils/createElement/createElement";
import { $ } from "../../utils/dom";
import Image from "../common/Image";

const RegisterIcon = () =>
  createElement({
    tagName: "button",
    classNames: ["gnb__button"],
    events: {
      click: () => {
        $("#register-modal-backdrop").classList.add("open");
      },
    },
    children: [Image({ src: "./add-button.png", alt: "음식점 추가" })],
  });

export default RegisterIcon;
