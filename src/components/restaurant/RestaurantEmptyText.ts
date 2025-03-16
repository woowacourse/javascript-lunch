import createDOMElement from '../../util/createDomElement';

function RestaurantEmptyText() {
  return createDOMElement({
    tag: 'div',
    class: 'empty-restaurant-text-container',
    children: createDOMElement({
      tag: 'h3',
      class: 'empty-restaurant-text',
      textContent: '음식점이 존재하지 않습니다.',
    }),
  });
}

export default RestaurantEmptyText;
