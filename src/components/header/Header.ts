import { AddButton } from '../../asset/img/index';
import DOM from '../../utils/DOM';
import { Button, ButtonProps } from '../tag/button';
import { Image, ImageProps } from '../tag/image';
import './header.css';

const { $ } = DOM;

class Header extends HTMLElement {
  private gnbButton: Button;

  constructor() {
    super();
    this.className = 'gnb';   
    this.createH1();
    this.gnbButton = this.createButton();
    this.openModal();
  }

  createH1() {
    const h1 = document.createElement('h1');
    h1.classList.add('gnb__title', 'text-title');
    h1.textContent = '점심 뭐 먹지';
    this.appendChild(h1);
  }

  createButton() {
    const image: ImageProps = {
      src: AddButton,
      alt: '음식점 추가',
    };
    const button: ButtonProps = {
      type: 'button',
      varient: 'gnb',
      ariaLabel: '음식점 추가',
      children: new Image(image),
    };
    const buttonElement = new Button(button);
    this.appendChild(buttonElement);
    return buttonElement;
  }

  openModal() {
    this.gnbButton.addEventListener('click', () => {
      $<HTMLElement>('.modal').classList.add('modal--open');
    });
  }
}

customElements.define('matzip-gnb', Header, {extends: 'header'});

export default Header;
