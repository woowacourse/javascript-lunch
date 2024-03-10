import dimmerClickHandler from "./handlers";
import InputDescription from "./input_description/InputDescription";
import InputLink from "./input_link/InputLink";
import InputName from "./input_name/InputName";
import ModalButton from "./modal_button/ModalButton";
import SelectCategory from "./select_category/SelectCategory";
import SelectDistance from "./select_distance/SelectDistance";

const renderModalForm = (form: Element) => {
  SelectCategory(form);
  InputName(form);
  SelectDistance(form);
  InputDescription(form);
  InputLink(form);
};

const renderModalContent = () => {
  const modal = document.getElementsByClassName("modal")[0];
  const form = document.getElementsByClassName("modal-form")[0];

  renderModalForm(form);

  ModalButton(modal, form);
  dimmerClickHandler(modal);
};

export default renderModalContent;
