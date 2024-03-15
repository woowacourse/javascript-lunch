import { $ } from '../../utils/querySelector';

interface Props {
  child: HTMLElement;
}

const createModal = ({ child }: Props) => {
  const toggle = () => {
    const modalContainer = $('.modal');
    if (modalContainer.classList.contains('modal--open')) {
      modalContainer.classList.remove('modal--open');
    } else modalContainer.classList.add('modal--open');
  };

  const setEvents = () => {
    const backdrop = $('.modal-backdrop');
    backdrop.addEventListener('click', () => toggle());
  };

  const render = () => {
    const modalStructure = /* html */ `
    <div class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container">${child}</div>
    </div>
    `;

    const mainContainer = $('main');
    mainContainer.insertAdjacentHTML('beforeend', modalStructure);

    setEvents();
  };

  render();
};

export default createModal;
