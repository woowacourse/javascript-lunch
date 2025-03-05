import { $ } from "../../utils/dom";

const registerIcon = () => {
  const registerIcon = document.createElement("button");
  registerIcon.classList.add("gnb__button");

  registerIcon.innerHTML = `<img src="./add-button.png" alt="음식점 추가" />`;
  registerIcon.addEventListener("click", () => {
    $(".modal").classList.add("modal--open");
  });
  return registerIcon;
};

export default registerIcon;
