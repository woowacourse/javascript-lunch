const Button = (category) => {
  const button = document.createElement("button");
  button.setAttribute("type", buttonCategory[category].type);
  button.setAttribute("id", buttonCategory[category].id);
  button.classList.add(buttonCategory[category].class);
  button.classList.add("text-caption");
  button.classList.add("button");
  button.textContent = buttonCategory[category].name;

  return button;
};

const buttonCategory = {
  cancel: {
    name: "취소하기",
    type: "button",
    class: "button--secondary",
    id: "cancel-button",
  },
  add: {
    name: "추가하기",
    type: "submit",
    class: "button--primary",
    id: "add-button",
  },
  delete: {
    name: "삭제하기",
    type: "button",
    class: "button--secondary",
    id: "delete-button",
  },
  close: {
    name: "닫기",
    type: "button",
    class: "button--primary",
    id: "close-button",
  },
};

export default Button;
