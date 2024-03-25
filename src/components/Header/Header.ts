import { $ } from '../../utils/querySelector';

interface Props {
  title: string;
  buttonEvent?: () => void;
}

const createHeader = ({ title, buttonEvent }: Props) => {
  const render = () => {
    const content = /* html */ `
    <h1 class="gnb__title text-title">${title}</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="./add-button.png" alt="음식점 추가" />
    </button>
    `;

    const headerContainer = $('.gnb');
    headerContainer.insertAdjacentHTML('beforeend', content);

    if (buttonEvent) {
      const imgButton = $('.gnb__button');
      imgButton.addEventListener('click', buttonEvent);
    }
  };

  render();
};

export default createHeader;
