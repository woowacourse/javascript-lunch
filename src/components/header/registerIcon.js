import createElement from "../../utils/createElement/createElement";
import { $ } from "../../utils/dom";
import Image from "../common/image";

const registerIcon = () => {
  const registerIcon = createElement({
    tagName: "button",
    classNames: ["gnb__button"],
    events: {
      click: () => {
        $(".modal-backdrop").classList.add("open");
      },
    },
  });

  registerIcon.appendChild(Image("./add-button.png", "음식점 추가"));

  return registerIcon;
};

export default registerIcon;
