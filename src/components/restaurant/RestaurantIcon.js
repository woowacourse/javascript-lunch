import createDOMElement from '../../util/createDomElement.js';

function RestaurantIcon({ src, alt }) {
  return createDOMElement({
    tag: 'img',
    src,
    alt,
    class: 'category-icon',
  });
}

export default RestaurantIcon;
