import IconButton from "./component/IconButton/IconButton.js";
import AddLunchModal from "./component/AddLunchModal/AddLunchModal.js";
import { DOM } from "./utils/dom.js";
import TextButton from "./component/TextButton/TextButton.js";
import LunchInfoCard from "./component/LunchInfoCard/LunchInfoCard.js";

IconButton.render(
  {
    src: "./templates/add-button.png",
    onClick: () => AddLunchModal.open(),
    label: "음식점 추가",
  },
  DOM.$header
);
TextButton.render(
  {
    title: "취소하기",
    onClick: () => AddLunchModal.close(),
    id: "cancel__button",
  },
  DOM.$buttonContainer
);
TextButton.render(
  {
    title: "추가하기",
    onClick: () => console.log("미구현"),
    id: "add__button",
  },
  DOM.$buttonContainer
);
