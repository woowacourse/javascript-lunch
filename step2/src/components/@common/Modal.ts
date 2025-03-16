import { Attribute, parseAttribute } from '../../utils/@common/domHelper';

interface ModalProps {
  attribute?: Attribute;
  children: string;
}

function Modal(props: ModalProps) {
  const { children, attribute } = props;

  return `
      <div ${
        attribute ? parseAttribute(attribute) : 'class="modal modal--open"'
      } >
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${children}
        </div>
      </div>

  `;
}
export default Modal;
