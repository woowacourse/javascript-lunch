import createDOMElement from '../../util/createDomElement.js';

function RestaurantIcon({ src, alt }) {
  return createDOMElement({
    tag: 'div',
    className: 'restaurant__category',
    children: [
      createDOMElement({
        tag: 'img',
        src,
        alt,
        className: 'category-icon'
      })
    ]
  });
}

export default RestaurantIcon;
