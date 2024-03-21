import { AddButton } from '../../asset/img/index';
import RestaurantForm from '../RestaurantForm';
import Modal from '../modal/Modal';
import { Button, ButtonProps } from '../tag/button';
import { Image, ImageProps } from '../tag/image';
import './header.css';

class Header extends HTMLElement {
  private modal: Modal;

  constructor(main: HTMLElement) {
    super();
    this.className = 'gnb';
    this.createH1();
    this.modal = this.createModal(main);
    this.createButton();
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
      onClick: this.modal.toggleModal.bind(this.modal),
    };

    const buttonElement = new Button(button);
    this.appendChild(buttonElement);
  }

  createModal(main: HTMLElement) {
    const modal = new Modal({
      title: '새로운 음식점',
    });
    const restaurantForm = new RestaurantForm(modal);
    modal.appendChildNode(restaurantForm);
    main.appendChild(modal);
    return modal;
  }
}

customElements.define('matzip-gnb', Header, { extends: 'header' });

export default Header;
