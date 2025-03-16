import Modal from "../components/Modal.js";
import Title from "../components/Title.js";
import Form from "../components/Form/Form.js";
import { MODAL_FORM_CONFIG, MODAL_TITLE } from "../constants/modalFormData.js";
import { generateFormItems } from "../utils/formUtils.js";

function createModalView() {
  const titleElement = Title(MODAL_TITLE);
  const { formItems, buttonsFormItems } = generateFormItems(MODAL_FORM_CONFIG);
  const formElement = Form(formItems, buttonsFormItems);
  const modalElement = Modal([titleElement, formElement]);

  return { modalElement, formElement };
}

export default createModalView;
