import { openModal } from '@/utils/view';
import BaseComponent from '../BaseComponent';
import BasicButton from '../BasicButton/BasicButton';

class EmptyView extends BaseComponent {
  #type;

  constructor(type: 'all' | 'favorite') {
    super();
    this.#type = type;
  }
  render() {
    const $box = document.createElement('div');
    $box.classList.add('no-data-box');

    const $textBox = document.createElement('div');
    $textBox.classList.add('text-box');
    const $text1 = document.createElement('div');
    const $text2 = document.createElement('div');
    const $text3 = document.createElement('div');
    $text3.classList.add('food-images');

    if (this.#type === 'all') {
      $text1.innerText = `아직 음식점이 없어요!`;
      $text2.innerText = `음식점을 추가해주세요`;
      $text3.textContent = '🍰 🍕 🍖 🍜 🍏';
    }
    if (this.#type === 'favorite') {
      $text1.innerText = `아직 즐겨찾기한 음식점이 없어요!`;
      $text2.innerText = `음식점의 ⭐️을 눌러보세요!`;
    }

    const $addbutton = new BasicButton({
      variant: 'primary',
      textContent: '추가하러 가기',
      type: 'button',
      clickEvent: () => openModal('add'),
    });

    $textBox.append($text1);
    $textBox.append($text2);
    $textBox.append($text3);

    $box.append($textBox);

    if (this.#type === 'all') {
      $box.append($addbutton);
    }

    this.append($box);
  }
}

export default EmptyView;

customElements.define('empty-view', EmptyView);
