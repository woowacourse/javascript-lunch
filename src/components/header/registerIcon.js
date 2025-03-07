import { $ } from "../../utils/dom";
import Image from "../common/image";

const registerIcon = () => {
  const registerIcon = document.createElement("button");

  registerIcon.classList.add("gnb__button");
  registerIcon.appendChild(Image("./add-button.png", "음식점 추가"));

  registerIcon.addEventListener("click", () => {
    $(".modal-backdrop").classList.add("open");
  });

  return registerIcon;
};

export default registerIcon;
