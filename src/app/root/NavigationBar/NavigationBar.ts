import { Asset } from '../../../asset/asset';
import { $ } from '../../../util/domSelector';

export default class NavigationBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    $('#add-restaurant-button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('showAddRestaurantModal'));
    });
  }

  private createAppTitle(): HTMLHeadingElement {
    const appTitle = document.createElement('h1');
    appTitle.classList.add('gnb__title', 'text-title');
    appTitle.textContent = '점심 뭐 먹지';
    return appTitle;
  }

  private createAddRestaurantButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'add-restaurant-button';
    button.classList.add('gnb__button');
    button.ariaLabel = '음식점 추가';

    button.appendChild(this.createAddRestaurantButtonIcon());
    return button;
  }

  private createAddRestaurantButtonIcon(): HTMLImageElement {
    const iconImage = document.createElement('img');
    iconImage.src = Asset.imageUrl.버튼_음식점추가;
    iconImage.alt = '음식점 추가';
    return iconImage;
  }

  private render() {
    this.classList.add('gnb');
    this.appendChild(this.createAppTitle());
    this.appendChild(this.createAddRestaurantButton());
  }
}

customElements.define('nav-bar', NavigationBar);
