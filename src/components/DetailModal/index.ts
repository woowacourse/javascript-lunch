import { imgSrc } from '../../constants/image';
import store from '../../store';
import { Category, Distance } from '../../types';
import $template from './index.html';

class DetailModal extends HTMLElement {
  connectedCallback() {
    this.render();

    const $removeButton = this.querySelector<HTMLButtonElement>('#remove-button')!;
    const $closeButton = this.querySelector<HTMLButtonElement>('#close-button')!;

    // 삭제하기
    $removeButton.addEventListener('click', () => {
      store.removeRestaurant(this.getAttribute('id')!);
      this.remove();
    });

    // 닫기
    $closeButton.addEventListener('click', () => {
      this.remove();
    });
  }

  render() {
    this.innerHTML = $template
      .replaceAll('{id}', this.getAttribute('id')!)
      .replaceAll('{src}', imgSrc[this.getAttribute('category') as Category])
      .replaceAll('{category}', this.getAttribute('category')!)
      .replaceAll('{name}', this.getAttribute('name')!)
      .replaceAll('{distance}', this.getAttribute('distance')!)
      .replaceAll('{description}', this.getAttribute('description')!)
      .replaceAll('{link}', this.getAttribute('link')!);
  }
}

export default DetailModal;
