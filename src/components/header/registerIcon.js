import { $ } from "../../utils/dom";
import Image from "../common/image";
import ModalContent from "../common/modal/modalContent";
import Title from "../common/title";
import RegisterForm from "../registerForm";

const registerIcon = (pushList) => {
  const registerIcon = document.createElement("button");

  registerIcon.classList.add("gnb__button");
  registerIcon.appendChild(Image("./add-button.png", "음식점 추가"));

  registerIcon.addEventListener("click", () => {
    $(".modal-backdrop").classList.add("open");
    ModalContent([
      Title("새로운 음식점", "h2", "modal-title", "text-title"),
      RegisterForm(pushList),
    ]);
  });

  return registerIcon;
};

export default registerIcon;
