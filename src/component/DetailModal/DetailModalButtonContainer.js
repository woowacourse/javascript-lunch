import TextButton from "../TextButton.js";
import Modal from "../Modal.js";

const DetailModalButtonContainer = {
  create() {
    const buttonContainerElement = document.createElement("div");
    buttonContainerElement.classList.add("button-container");
    buttonContainerElement.appendChild(
      TextButton.create(
        {
          id: "delete__button",
          title: "삭제하기",
        },
        "secondary"
      )
    );
    buttonContainerElement.appendChild(
      TextButton.create(
        {
          id: "close__button",
          title: "닫기",
          onClick: () => Modal.close("detail"),
        },
        "primary"
      )
    );

    return buttonContainerElement;
  },
};

export default DetailModalButtonContainer;
