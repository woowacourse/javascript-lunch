import Component from '../core/Component.ts';
import { html } from '../lib/utils.ts';

interface HeaderProps {
  title: string;
  alt: string;
}

export default class RestaurantHeader extends Component<null, HeaderProps> {
  template() {
    return html`
      <header class="gnb">
        <h1 class="gnb__title text-title">${this.props?.title ?? ''}</h1>
        <button type="button" class="gnb__button" aria-label="${this.props?.alt ?? ''}">
          <img src="images/add-button.png" alt="${this.props?.alt ?? ''}" />
        </button>
      </header>
    `;
  }

  attachEventListener() {
    this.element?.addEventListener('click', () => {
      document.querySelector('#restaurant-add-modal')?.classList.add('modal--open');
    });
  }
}
