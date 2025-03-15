import createDOMElement from '../../util/createDomElement';

function RestaurantTabContainer() {
  return createDOMElement({
    tag: 'section',
    class: 'restaurant-tab-container',
    'data-active': 'all',
    children: [
      createDOMElement({
        tag: 'div',
        class: 'restaurant-tab active',
        'data-tab': 'all',
        textContent: '모든 음식점',
      }),
      createDOMElement({
        tag: 'div',
        class: 'restaurant-tab',
        'data-tab': 'favorite',
        textContent: '자주 가는 음식점',
      }),
      createDOMElement({
        tag: 'div',
        class: 'restaurant-tab-underline',
      }),
    ],
  });
}

export default RestaurantTabContainer;
