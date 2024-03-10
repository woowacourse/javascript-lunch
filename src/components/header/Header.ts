import { AddButton } from '../../asset/img/index';
import DOM from '../../utils/DOM';
import { Button, ButtonProps } from '../tag/button';
import { Image, ImageProps } from '../tag/image';
import './header.css';

const { $ } = DOM;

class Header extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    </header>`;

    this.createButton();
    this.openModal();
  }

  createButton() {
    const image: ImageProps = {
      src: AddButton,
      alt: '음식점 추가',
    };
    const button: ButtonProps = {
      type: 'button',
      classnames: ['gnb__button'],
      ariaLabel: '음식점 추가',
      children: new Image(image),
    };
    $<HTMLElement>('.gnb')?.appendChild(new Button(button));
  }

  openModal() {
    $<HTMLButtonElement>('.gnb__button').addEventListener('click', () => {
      $<HTMLElement>('.modal').classList.add('modal--open');
    });
  }
}

customElements.define('matzip-gnb', Header);
