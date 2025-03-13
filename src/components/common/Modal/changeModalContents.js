import createElement from "../../../utils/createElement/createElement";
import { $ } from "../../../utils/dom";
import ModalContent from "./ModalContent";

const changeModalContents = (...contents) => {
  $(".modal-backdrop").innerHTML = "";

  $(".modal-backdrop").appendChild(ModalContent([...contents], "sldkfj"));
};

export default changeModalContents;
