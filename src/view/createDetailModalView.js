import Button from "../components/Button.js";
import DetailItem from "../components/DetailItem.js";
import ButtonsForm from "../components/Form/ButtonsForm.js";
import Modal from "../components/Modal.js";

const buttons = [
  { type: "submit", stylingBased: "secondary", text: "삭제하기" },
  { type: "button", stylingBased: "primary", text: "닫기" },
];

function createDetailModalView(restaurant) {
  const detailItemElement = DetailItem(restaurant.restaurant);
  const formButtons = buttons.map((buttonData) => Button(buttonData));
  const buttonsFormElement = ButtonsForm(formButtons);
  const modalElement = Modal([detailItemElement, buttonsFormElement]);

  return modalElement;
}

export default createDetailModalView;
