import Component from '../core/Component.ts';
import { html } from '../lib/utils.ts';

interface HeaderProps {
  title: string;
  alt: string;
}

export default class RestaurantHeader extends Component<null, HeaderProps> {
  override template() {
    return html`
      <header class="gnb">
        <h1 class="gnb__title text-title">${this.props?.title ?? ''}</h1>
        <button type="button" class="gnb__button" aria-label="${this.props?.alt ?? ''}">
          <img src="images/add-button.png" alt="${this.props?.alt ?? ''}" />
        </button>
      </header>
    `;
  }

  override attachEventListener() {
    this.element?.querySelector('.gnb__button')?.addEventListener('click', () => {
      document.querySelector('#restaurant-add-modal')?.classList.add('modal--open');
    });
  }
}
