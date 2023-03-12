import addButton from '../../assets/add-button.png';

export default class Header {
  $header: HTMLHeadElement | null;

  constructor() {
    const $gnbElement = document.querySelector<HTMLHeadElement>('.gnb');

    this.$header = $gnbElement;
    if (this.$header === null) return;

    this.render(this.$header);
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
    $targetElement.insertAdjacentHTML('beforeend', this.template());
  }

  addHeaderEventListener(callback: (e: MouseEvent) => void) {
    if (this.$header === null) return;
    const $button = this.$header.querySelector('.gnb__button');
    if ($button === null || !($button instanceof HTMLButtonElement)) return;

    $button.addEventListener('click', callback);
  }
}
