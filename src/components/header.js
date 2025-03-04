import { DOM } from '../dom.js';

export const createHeader = () => {
  const header = document.createElement('header');
  const headerH1 = document.createElement('h1');
  const headerButton = document.createElement('button');
  const headerImg = document.createElement('img');

  headerH1.classList = 'gnb__title text-title';
  headerH1.textContent = '점심 뭐 먹지';
  headerButton.type = 'button';
  headerButton.classList = 'gnb__button';
  headerButton.ariaLabel = '음식점 추가';
  headerImg.src = '../../public/assets/add-button.png';
  headerImg.alt = '음식점 추가';

  headerButton.appendChild(headerImg);

  header.appendChild(headerH1);
  header.appendChild(headerButton);

  header.classList = 'gnb';
  DOM.APP.prepend(header);
};
