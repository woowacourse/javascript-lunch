import TextButton from "../TextButton.js";
import Modal from "../Modal.js";
import LocalStorage from "../../utils/LocalStorage.js";
import RestaurantListUtils from "../../utils/RestaurantListUtils.js";
import Renderer from "../../utils/Renderer.js";

const DetailModalButtonContainer = {
  create() {
    const buttonContainerElement = document.createElement("div");
    buttonContainerElement.classList.add("button-container");
    buttonContainerElement.appendChild(
      TextButton.create(
        {
          id: "delete__button",
          title: "삭제하기",
          onClick: this.onDeleteButtonClick,
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

  onDeleteButtonClick() {
    const deletedList = RestaurantListUtils.delete(
      LocalStorage.getJSON(RESTAURANT_LIST_KEY),
      id
    );
    LocalStorage.setJSON(RESTAURANT_LIST_KEY, deletedList);
    Renderer.renderOuter();
    Modal.close("detail");
  },
};

export default DetailModalButtonContainer;
