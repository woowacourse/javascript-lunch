import Component from '../core/Component.js';

class Header extends Component {
  template() {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">${this.props.title}</h1>
      </header>
    `;
  }

  onRender() {
    if (!this.element.querySelector('.gnb__button')) {
      const baseURL = window.location.origin.includes('github.io') ? '/javascript-lunch' : '../../public';
      const gnbButton = `
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="${baseURL}/images/add-button.png" alt="음식점 추가" />
        </button>
      `;
      const $gnbTitle = this.element.querySelector('.gnb__title');
      $gnbTitle.insertAdjacentHTML('afterend', gnbButton);
    }

    const $gnbButton = this.element.querySelector('.gnb__button');

    $gnbButton.addEventListener('click', () => {
      const $modal = this.parent.querySelector('.modal');
      $modal.classList.remove('hidden');
    });
  }
}

export default Header;
