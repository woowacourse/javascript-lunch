import IconButton from "./component/IconButton/IconButton.js";
import AddLunchModal from "./component/AddLunchModal/AddLunchModal.js";
import { DOM } from "./utils/dom.js";
import TextButton from "./component/TextButton/TextButton.js";

IconButton.init(
  {
    src: "./templates/add-button.png",
    onClick: () => AddLunchModal.open(),
    label: "음식점 추가",
  },
  DOM.$header
);
TextButton.init(AddLunchModal.close, DOM.$cancelButton);
