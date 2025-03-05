import querySelector from "./utils/querySelector.js";
import Store from "./components/store.js";
import storeList from "./storeList.js";
import Button from "./components/button.js";
import optionInput from "./components/optionInput.js";
import textInput from "./components/textInput.js";
import textArea from "./components/textArea.js";

const options = {
  category: ["한식", "중식", "일식", "양식", "아시안", "기타"],
  distance: ["5", "10", "15", "20", "25", "30"],
};

addEventListener("load", () => {
  storeList.forEach((store) => {
    addStore(store);
  });

  querySelector.gnbButton().addEventListener("click", () => {
    querySelector.modal().classList.add("modal--open");
  });

  querySelector.modalForm().addEventListener("submit", (e) => updateStore(e));

  querySelector
    .modalForm()
    .appendChild(optionInput("category", options.category));
  querySelector.modalForm().appendChild(textInput("name", true));
  querySelector
    .modalForm()
    .appendChild(optionInput("distance", options.distance));
  querySelector
    .modalForm()
    .appendChild(textArea("description", "메뉴 등 추가 정보를 입력해 주세요."));
  querySelector
    .modalForm()
    .appendChild(
      textInput(
        "link",
        false,
        "매장 정보를 확인할 수 있는 링크를 입력해 주세요."
      )
    );

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(Button("cancel"));
  buttonContainer.appendChild(Button("add"));
  querySelector.modalForm().appendChild(buttonContainer);

  querySelector.modalCancelButton().addEventListener("click", closeModal);
});

const addStore = (storeProps) => {
  const list = document.createElement("li");
  list.classList.add("restaurant");
  const store = Store(storeProps);
  list.innerHTML = store;
  querySelector.restaurantList().appendChild(list);
};

const updateStore = (e) => {
  e.preventDefault();

  const store = {
    category: e.target[0].value,
    name: e.target[1].value,
    dist: e.target[2].value,
    description: e.target[3].value,
    link: e.target[4].value,
  };
  storeList.push(store);
  addStore(store);

  closeModal();

  Array.from(e.target).forEach((item) => {
    item.value = "";
  });
};

const closeModal = () => {
  querySelector.modal().classList.remove("modal--open");
};
