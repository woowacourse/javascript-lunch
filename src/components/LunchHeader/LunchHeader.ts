import { IMAGE } from '../../assets/assets';
import AddRestaurantModal from '../AddRestaurantModal/AddRestaurantModal';

const LunchHeader = {
  create() {
    const header = document.createElement('header');
    header.classList.add('gnb');
    const title = this.createTitle();
    const addButton = this.createAddButton();

    header.appendChild(title);
    header.appendChild(addButton);

    this.setHandle(addButton);

    document.querySelector('body')?.prepend(header);
  },

  setHandle(addButton: HTMLButtonElement) {
    addButton.addEventListener('click', () => {
      AddRestaurantModal.show();
    });
  },

  createTitle() {
    const title = document.createElement('h1');
    title.classList.add('gnb__title');
    title.classList.add('text-title');
    title.textContent = '점심 뭐 먹지';
    return title;
  },

  createAddButton() {
    const addButton = document.createElement('button');
    const addButtonImg = document.createElement('img');

    addButtonImg.src = IMAGE.url.버튼_음식점추가;
    addButtonImg.alt = '음식점 추가';

    addButton.appendChild(addButtonImg);
    addButton.classList.add('gnb__button');
    addButton.type = 'button';
    addButton.ariaLabel = '음식점 추가';
    return addButton;
  },
};
export default LunchHeader;
