import { Category, Distance } from '../../types';
import { Restaurant } from './../../types';
import $template from './index.html';

interface Props {
  onAddButtonClick: (restaurant: Restaurant) => void;
}

class AddModal extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = $template;
  }

  connectedCallback() {
    const $modal = this.querySelector('.modal');
    const $cancelButton = this.querySelector('#cancel-button');
    $cancelButton?.addEventListener('click', () => {
      $modal?.classList.remove('modal--open');
    });
  }

  setProps({ onAddButtonClick }: Props) {
    this.setHandleAddButtonClick(onAddButtonClick);
  }

  private setHandleAddButtonClick(onAddButtonClick: Props['onAddButtonClick']) {
    const $modal = this.querySelector('.modal');
    const $form = this.querySelector('#add-restaurant');
    $form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const $category = this.querySelector('#category') as HTMLSelectElement;
      const $name = this.querySelector('#name') as HTMLInputElement;
      const $distance = this.querySelector('#distance') as HTMLSelectElement;
      const $description = this.querySelector('#description') as HTMLTextAreaElement;
      const $link = this.querySelector('#link') as HTMLInputElement;

      onAddButtonClick({
        category: $category.value as Category,
        name: $name.value,
        distance: Number($distance.value) as Distance,
        isFavorite: false,
        description: `"${$description.value}"`,
        link: $link.value,
      });

      $modal?.classList.remove('modal--open');
      $category.value = '';
      $name.value = '';
      $distance.value = '';
      $description.value = '';
      $link.value = '';
    });
  }
}

export default AddModal;
