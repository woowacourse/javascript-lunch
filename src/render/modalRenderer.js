import Button from "../components/Button.js";
import OptionInput from "../components/OptionInput.js";
import StoreDetail from "../components/StoreDetail.js";
import TextArea from "../components/TextArea.js";
import TextInput from "../components/TextInput.js";
import helpText from "../constants/helpText.js";
import options from "../constants/options.js";
import validate from "../utils/validate.ts";
import initRenderer from "./initRenderer.js";

const modalRenderer = {
  // 모달창 닫기
  closeModal: () => {
    document.querySelector(".modal").classList.remove("modal--open");
    if (document.querySelector(".modal-form"))
      document.querySelector(".modal-form").reset();
  },

  // **모달 입력 폼**
  // 폼 추가
  addForm: () => {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.innerHTML = `<h2 class="modal-title text-title">새로운 음식점</h2>
    <form class="modal-form"></form>`;

    const modalForm = document.querySelector(".modal-form");
    modalForm.appendChild(OptionInput("category", options.category));
    modalForm.appendChild(TextInput("name", true));
    modalForm.appendChild(OptionInput("distance", options.distance));
    modalForm.appendChild(TextArea("description", helpText.description));
    modalForm.appendChild(TextInput("link", false, helpText.link));

    modalForm.appendChild(
      modalRenderer.addButtons([
        {
          name: "취소하기",
          type: "button",
          class: "button--secondary",
          id: "cancel-button",
        },
        {
          name: "추가하기",
          type: "submit",
          class: "button--primary",
          id: "add-button",
        },
      ])
    );
    modalRenderer.addFormCheck();

    document
      .querySelector("#cancel-button")
      .addEventListener("click", modalRenderer.closeModal);
  },

  // 버튼 추가
  addButtons: (buttonProps) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonProps.forEach((props) => {
      buttonContainer.appendChild(Button(props));
    });

    return buttonContainer;
  },

  // 폼 입력 검증
  addFormCheck: () => {
    const nameInput = document.querySelector("#name");
    const descInput = document.querySelector("#description");
    const linkInput = document.querySelector("#link");
    const categorySelect = document.querySelector("#category");
    const distSelect = document.querySelector("#distance");

    modalRenderer.checkInput(nameInput, validate.nameLength);
    modalRenderer.checkInput(descInput, validate.descLength);
    modalRenderer.checkInput(linkInput, validate.linkForm);
    modalRenderer.checkInput(categorySelect, validate.emptySelector, "change");
    modalRenderer.checkInput(distSelect, validate.emptySelector, "change");
  },

  // 버튼 활성화 체크
  checkInput: (input, validate, type = "input") => {
    const addButton = document.querySelector("#add-button");

    input.addEventListener(type, (e) => {
      try {
        validate(e.target.value);
        modalRenderer.removeErrorText(input);
        addButton.classList.remove("disabled-button");
        addButton.disabled = false;
      } catch (e) {
        modalRenderer.addErrorText(input, e);
        addButton.classList.add("disabled-button");
        addButton.disabled = true;
      }
    });
  },

  // 입력 폼 에러 메시지 추가
  addErrorText: (input, e) => {
    if (!input.classList.contains("form-item--error")) {
      input.classList.add("form-item--error");
      const parentNode = input.parentNode;
      const errorText = document.createElement("span");
      errorText.classList.add("error-text");
      errorText.innerText = e.message;
      parentNode.appendChild(errorText);
    }
  },

  // 입력 폼 에러 메시지 제거
  removeErrorText: (input) => {
    if (input.parentNode.querySelector(".error-text")) {
      input.classList.remove("form-item--error");
      input.parentNode.removeChild(
        input.parentNode.querySelector(".error-text")
      );
    }
  },

  // **식당 상세 정보**
  setStoreInfoModal: (store) => {
    const modalContainer = document.querySelector(".modal-container");
    modalContainer.setAttribute("id", store.id);
    modalContainer.innerHTML = StoreDetail(store);
    modalContainer.appendChild(
      modalRenderer.addButtons([
        {
          name: "삭제하기",
          type: "button",
          class: "button--secondary",
          id: "delete-button",
        },
        {
          name: "닫기",
          type: "button",
          class: "button--primary",
          id: "close-button",
        },
      ])
    );
  },
};

export default modalRenderer;
