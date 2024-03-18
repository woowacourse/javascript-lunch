import './style.css';

import { RestaurantInfo } from '../../types';

export interface RestaurantListTemplateProps {
  $parent: HTMLElement | Element | null;
  restaurantList?: RestaurantInfo[];
  classList?: string[];
}
class RestaurantListTemplate {
  constructor(RestaurantListTemplateProps: RestaurantListTemplateProps) {
    const { $parent, restaurantList, classList } = RestaurantListTemplateProps;

    const layout = this.createListLayout(restaurantList, classList);
    this.#addListToListParentElement(layout, $parent);
  }

  createListLayout(restaurantList?: RestaurantInfo[], classList?: string[]) {
    const $list = document.createElement('ul');
    classList?.forEach((item) => $list.classList.add(item));
    $list.classList.add('restaurant-list');

    if (!restaurantList || !restaurantList[0]) {
      const $noneRestaurant = document.createElement('none-restaurant');
      $list.appendChild($noneRestaurant);

      return $list;
    }

    restaurantList.forEach((info) => {
      const $item = document.createElement('restaurant-item');
      $item.setAttribute('name', info.name);

      $list.appendChild($item);
    });

    return $list;
  }

  #addListToListParentElement(
    layout: HTMLElement,
    $parent: HTMLElement | Element | null,
  ) {
    if (!$parent) return;
    const $newParent = document.createElement($parent.tagName);
    $newParent.className = $parent.className;
    $newParent.appendChild(layout);

    $parent.parentElement?.replaceChild($newParent, $parent);
  }
}

export default RestaurantListTemplate;
