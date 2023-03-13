import addButton from '../../assets/add-button.png';

export default class Header {
  $header = document.createElement('header');

  constructor($root: HTMLElement) {
    this.$header.className = 'gnb';
    this.render($root);
  }

  template() {
    return `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
     <button type="button" class="gnb__button"  aria-label="음식점 추가">
       <img src="${addButton}" alt="음식점 추가">
     </button>
   `;
  }

  render($targetElement: HTMLHeadElement) {
    this.$header.innerHTML = this.template();
    $targetElement.insertAdjacentElement('afterbegin', this.$header);
  }

  addHeaderEventListener(callback: (e: MouseEvent) => void) {
    const $button = this.$header.querySelector('.gnb__button');
    if ($button === null || !($button instanceof HTMLButtonElement)) return;

    $button.addEventListener('click', callback);
  }
}
