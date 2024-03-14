import { Category, Distance, IRestaurant } from '@/types/Restaurant';
import BaseComponent from '../BaseComponent';
import BasicModal from '../BasicModal/BasicModal';

type DetailModalProps = {
  name: string;
  distance: Distance;
  description?: string;
  category: Category;
};

class RestaurantDetailModal extends BaseComponent {
  // #id: number;
  #name: string;
  #distance: Distance;
  #category: Category;
  #description?: string;

  constructor({ name, distance, description, category }: DetailModalProps) {
    super();
    // this.#id = Number(new URLSearchParams(window.location.search).get('id'));
    this.#category = category;
    this.#name = name;
    this.#distance = distance;
    this.#description = description;
  }

  render() {
    const $fragment = new DocumentFragment();
    const $title = document.createElement('div');
    $title.textContent = this.#name;
    $fragment.append($title);

    // const $categoryIcon = new CategoryIconBox(this.#category);
    // const $fragment = new DocumentFragment();
    // $fragment.append($categoryIcon);

    // const Icon = document.createElement('div');
    // Icon.classList.add('aa');
    // $fragment.append(Icon);

    // this.makeTitle();
    this.replaceWith(new BasicModal($fragment));
  }
}

export default RestaurantDetailModal;

customElements.define('detail-modal', RestaurantDetailModal);
