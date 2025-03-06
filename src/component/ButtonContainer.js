import TextButton from "./TextButton.js";
import AddLunchModal from "./AddLunchModal.js";

const ButtonContainer = {
  create() {
    const buttonContainerElement = document.createElement("div");
    buttonContainerElement.classList.add("button-container");
    buttonContainerElement.appendChild(
      TextButton.create({
        id: "cancel__button",
        title: "취소하기",
        onClick: () => AddLunchModal.close(),
      })
    );
    buttonContainerElement.appendChild(
      TextButton.create({
        id: "add__button",
        title: "추가하기",
      })
    );

    return buttonContainerElement;
  },
};

export default ButtonContainer;
